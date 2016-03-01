var React = require('react');
var GoalStore = require('../stores/GoalStore.jsx');
var ApiUtil = require('../util/apiUtil.js');
var Goal = require('./goal.jsx');

var GoalList = React.createClass({
  getInitialState: function(){
    return { goals: GoalStore.uncompleted()};
  },

  _onChange: function(){
    this.setState({goals: GoalStore.uncompleted()})
  },

  componentDidMount: function(){
    this.goalListener = GoalStore.addListener(this._onChange);
    ApiUtil.fetchAllGoals();
  },

  componentWillUnmount: function(){
    this.goalListener.remove();
  },

  render: function(){
    var that = this;

    return <div>
    <ul>
    {this.state.goals.map(function (goal, i) {
      return <li key={i}> <Goal goal={goal}/>
      </li>
    })}
    </ul>
    </div>
  }
});

module.exports = GoalList;
