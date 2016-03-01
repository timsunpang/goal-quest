var Dispatcher = require('../dispatcher/dispatcher.js'),
    GoalConstants = require('../constants/goalConstants.js');

module.exports = {
  receiveAllGoals: function (goals) {
    Dispatcher.dispatch({
      actionType: GoalConstants.GOALS_RECEIVED,
      goals: goals
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

  confirmGoalChange: function() {
    Dispatcher.dispatch({
      actionType: GoalConstants.UPDATE_GOAL
    })
  }
}
