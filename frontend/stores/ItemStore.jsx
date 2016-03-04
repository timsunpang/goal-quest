var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var ItemConstants = require('../constants/itemConstants.js');

var ItemStore = new Store(AppDispatcher);
var _items = {};

var updateItems = function(items){
  _items = {};
  items.forEach(function(item){
    if (!(item.owned && item.item_type === "armor")) {
      _items[item.id] = item;
    }
  })
};

ItemStore.retrieveAll = function() {
  var items = []

  for (id in _items) {
    items.push(_items[id]);
  }

  return items;
};

ItemStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case ItemConstants.ITEMS_RECEIVED:
    updateItems(payload.items);
    ItemStore.__emitChange();
    break;
  }
};

module.exports = ItemStore;
