var ApiActions = require('../actions/apiActions.js');
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
        ApiActions.receiveGoal(goal);
      }
    })
  },

  newGoal: function(params) {
    $.ajax({
      url: "api/goals/",
      method: "post",
      data: { goal: params },
      success: function (goal) {
        ApiActions.receiveGoal(goal);
      }
    })
  },

  fetchCurrentUser: function() {
    $.ajax({
      url: "api/users",
      success: function (user) {
        ApiActions.receiveUser(user);
      }
    })
  },

  updateCurrentUser: function(id, params) {
    $.ajax({
      url: "api/users/" + id,
      method: "patch",
      data: { user: params },
      success: function (user) {
        ApiActions.receiveUser(user);
      }
    })
  },

  fetchAllItems: function() {
    $.ajax({
      url: "api/items",
      success: function (items) {
        ApiActions.receiveAllItems(items);
      }
    })
  },

  fetchAllEquipment: function() {
    $.ajax({
      url: "api/items",
      success: function (items) {
        ApiActions.receiveAllEquipment(items);
      }
    })
  },

  changeArmor: function(user_id, equipped_item) {
    $.ajax({
      url: "api/users/" + user_id,
      method: "patch",
      data: { user: equipped_item },
      success: function (user) {
        ApiActions.receiveUser(user);
      }
    })
  },

  useItem: function(item_id) {
    $.ajax({
      url: "api/ownerships/" + item_id,
      method: "delete",
      success: function () {
        ApiActions.removeItem(item_id);
      }
    })
  },

  purchaseNewItem: function(item_id){
    $.ajax({
      url: "api/ownerships/",
      method: "post",
      data: { ownership: {item_id: item_id} },
      success: function () {
        console.log("Bought item!")
      }
    })
  },

  logout: function() {
    $.ajax({
      url: "/session",
      type: "post",
      data: {_method: 'delete'},
      success: function() {
        window.location = "session/new"
      }
    })
  }

};

module.exports = ApiUtil;
