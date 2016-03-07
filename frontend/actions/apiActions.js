var Dispatcher = require('../dispatcher/dispatcher.js'),
    GoalConstants = require('../constants/goalConstants.js'),
    UserConstants = require('../constants/userConstants.js'),
    ItemConstants = require('../constants/itemConstants.js');

module.exports = {
  receiveAllGoals: function (goals) {
    Dispatcher.dispatch({
      actionType: GoalConstants.GOALS_RECEIVED,
      goals: goals
    });
  },

  receiveAllItems: function (items) {
    Dispatcher.dispatch({
      actionType: ItemConstants.ITEMS_RECEIVED,
      items: items
    });
  },

  removeItem: function (id) {
    Dispatcher.dispatch({
      actionType: ItemConstants.ITEM_DELETED,
      id: id
    });
  },

  receiveAllEquipment: function (items) {
    Dispatcher.dispatch({
      actionType: ItemConstants.EQUIPMENT_RECEIVED,
      items: items
    });
  },

  receiveUser: function(user){
    Dispatcher.dispatch({
      actionType: UserConstants.USER_RECEIVED,
      user: user
    });
  },

  removeGoal: function (id) {
    Dispatcher.dispatch({
      actionType: GoalConstants.GOAL_DELETED,
      id: id
    });
  },

  receiveGoal: function(goal) {
    Dispatcher.dispatch({
      actionType: GoalConstants.GOAL_RECEIVED,
      goal: goal
    })
  },

  addNotification: function(notification) {
    Dispatcher.dispatch({
      actionType: 'NOTIFICATION_RECEIVED',
      notification: notification
    })
  },

  addNotifications: function(notification) {
    Dispatcher.dispatch({
      actionType: 'NOTIFICATIONS_RECEIVED',
      notification: notification
    })
  }
}
