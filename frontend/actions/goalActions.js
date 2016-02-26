var Dispatcher = require('../dispatcher/dispatcher.js'),
    GoalConstants = require('../constants/goalConstants.js');

module.exports = {
  receiveAllGoals: function (goals) {
    Dispatcher.dispatch({
      actionType: GoalConstants.GOALS_RECEIVED,
      goals: goals
    });
  }
}
