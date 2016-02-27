var AppDispatcher = require('../dispatcher/dispatcher.js');
var Store = require('flux/utils').Store;
var GoalConstants = require('../constants/goalConstants.js');

var GoalStore = new Store(AppDispatcher);
var _goals = {};
var _callbacks = [];

var resetGoals = function (goals) {
  _goals = {};
  goals.forEach(function(goal){
    _goals[goal.id] = goal;
  })
};

GoalStore.all = function () {
  var goals = [];
  for (var id in _goals) {
    goals.push(_goals[id]);
  }
  return goals;
};

GoalStore.changed = function () {
  _callbacks.forEach(function(callback) {
    callback();
  });
};

GoalStore.addChangedHandler = function() {

};

GoalStore.removeChangedHandler = function() {

};

GoalStore.create = function(todo) {

};

GoalStore.destroy = function(id) {
  if (_goals[id]){
    delete _goals[id];
    GoalStore.__emitChange();
    console.log("success")
  } else {
    console.log("error")
  }
};

GoalStore.toggleDone = function(id) {

};

GoalStore.__onDispatch = function (payload) {
  switch(payload.actionType) {
  case GoalConstants.GOALS_RECEIVED:
    resetGoals(payload.goals)
    GoalStore.__emitChange();
    break;
  case GoalConstants.GOAL_RECEIVED:
    GoalStore.__emitChange();
    break;
  case GoalConstants.GOAL_DELETED:
    GoalStore.destroy(payload.id);
    GoalStore.__emitChange();
    break;
  }
};

module.exports = GoalStore;
