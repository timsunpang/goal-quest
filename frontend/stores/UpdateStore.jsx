var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var GoalConstants = require('../constants/goalConstants.js');

var UpdateStore = new Store(AppDispatcher);

UpdateStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case GoalConstants.UPDATE_GOAL:
    UpdateStore.__emitChange();
    break;
  }
};

module.exports = UpdateStore;
