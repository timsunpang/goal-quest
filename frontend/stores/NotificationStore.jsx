var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;

var NotificationStore = new Store(AppDispatcher);
var _notifications = [];

var updateNotification = function(notification){
  _notifications = [notification];
};

var updateNotifications = function(notification){
  _notifications.push(notification)
};

NotificationStore.retrieve = function() {
  return _notifications;
};

NotificationStore.lastId = function() {
  return _notifications[_notifications.length - 1].id;
}

NotificationStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case 'NOTIFICATION_RECEIVED':
    updateNotification(payload.notification);
    NotificationStore.__emitChange();
    break;
  case 'NOTIFICATIONS_RECEIVED':
    updateNotifications(payload.notification);
    break;
  }
};

module.exports = NotificationStore;
