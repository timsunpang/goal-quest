var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var UserConstants = require('../constants/userConstants.js');

var UserStore = new Store(AppDispatcher);
var _user = {};

var updateUser = function(user){
  _user = user;
}

UserStore.retrieve = function() {
  return _user;
};

UserStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case UserConstants.USER_RECEIVED:
    updateUser(payload.user);
    UserStore.__emitChange();
    break;
  }
};

module.exports = UserStore;
