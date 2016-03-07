var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var ItemConstants = require('../constants/itemConstants.js');

var ItemStore = new Store(AppDispatcher);
var _items = {};
var _equipment = {};

var updateItems = function(items){
  _items = {};
  items.forEach(function(item){
    if (!(item.owned && item.item_type === "armor") && (!(item.special) && (item.id !== 1))) {
      _items[item.id] = item;
    }
  })
};

var updateEquipment = function(items) {
  _equipment = {};
  items.forEach(function(item){
    if (item.owned && item.id !== 1) {
      _equipment[item.id] = item;
    }
  })
};

var removeItem = function(id) {
  if (_equipment[id]){
    delete _equipment[id];
  }
}

ItemStore.getItem = function(item_id) {
  return _equipment[item_id]
}

ItemStore.allEquipped = function(equippedIds) {
  var items = [];

  equippedIds.forEach(function(id) {
    items.push(_equipment[id])
  });

  return items;
};

ItemStore.allMyEquipment = function() {
  var items = [];

  for (id in _equipment) {
    if (!_equipment[id].special){
      items.push(_equipment[id]);
    }
  };

  return items;
}

ItemStore.retrieveAll = function() {
  var items = [];

  for (id in _items) {
    items.push(_items[id]);
  };

  return items;
};

ItemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case ItemConstants.ITEMS_RECEIVED:
    updateItems(payload.items);
    ItemStore.__emitChange();
    break;
  case ItemConstants.EQUIPMENT_RECEIVED:
    updateEquipment(payload.items);
    ItemStore.__emitChange();
    break;
  case ItemConstants.ITEM_DELETED:
    removeItem(payload.id);
    ItemStore.__emitChange();
    break;
  }
};

module.exports = ItemStore;
