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
  }
};

module.exports = ApiUtil;
