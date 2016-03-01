var ApiActions = require('../actions/goalActions.js');
var React = require('react');

var ApiUtil = {
  fetchAllGoals: function() {
    $.ajax({
      url: "api/goals",
      success: function (goals) {
        ApiActions.receiveAllGoals(goals);
      }
    })
  },

  destroyGoal: function(id) {
    $.ajax({
      url: "api/goals/" + id,
      method: "delete",
      success: function () {
        ApiActions.removeGoal(id);
      }
    })
  },

  completeGoal: function(id) {
    $.ajax({
      url: "api/goals/" + id,
      method: "patch",
      data: { goal: { completed: true } },
      success: function (goal) {
        ApiActions.receiveGoal(goal);
      }
    })
  },

  updateGoal: function(id, params) {
    $.ajax({
      url: "api/goals/" + id,
      method: "patch",
      data: { goal: params },
      success: function (goal) {
        ApiActions.confirmGoalChange(goal);
      }
    })
  }
};

module.exports = ApiUtil;
