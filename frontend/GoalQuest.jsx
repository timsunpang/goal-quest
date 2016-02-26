var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./util/apiUtil'),
    GoalStore = require('./stores/GoalStore');

var App = React.createClass({

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

  handleDestroy: function(){
    console.log("DELETE!")
  },

  render: function(){
    var that = this;

    return <ul>
        {this.state.goals.map(function (goal) {
          return <li>{goal.title}
            <button onClick= {that.handleDestroy}>Delete</button>
            <button>Complete</button>
          </li>
        })}
      </ul>;
    }
  });

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<App />, document.getElementById("content") )
});
