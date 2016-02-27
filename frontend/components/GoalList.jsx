var React = require('react');
var GoalStore = require('../stores/GoalStore.jsx');
var ApiUtil = require('../util/apiUtil.js');

var GoalList = React.createClass({
  getInitialState: function(){
    return { goals: GoalStore.all()};
  },

  _onChange: function(){
    this.setState({goals: GoalStore.all()})
  },

  componentDidMount: function(){
    this.goalListener = GoalStore.addListener(this._onChange);
    ApiUtil.fetchAllGoals();
  },

  componentWillUnmount: function(){
    this.goalListener.remove();
  },

  handleDestroy: function(id){
    console.log(id);
    ApiUtil.destroyGoal(id);
    console.log("delete!");
  },

  render: function(){
    var that = this;

    return <div>
    <ul>
    {this.state.goals.map(function (goal) {
      return <li>{goal.title}
      <button onClick={that.handleDestroy.bind(this, goal.id)}>Delete</button>
      <button>Complete</button>
      </li>
    })}
    </ul>
    </div>
  }
});

module.exports = GoalList;
