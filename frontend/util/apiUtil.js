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
  }
};

module.exports = ApiUtil;
