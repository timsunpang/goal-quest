var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./util/apiUtil'),
    GoalStore = require('./stores/GoalStore');
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    Header = require('./components/header.jsx'),
    Content = require('./components/content.jsx');


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

  handleDestroy: function(id){
    console.log(id);
    ApiUtil.destroyGoal(id);
    console.log("delete!");
  },

  render: function(){
    var that = this;

    return (
      <main>
        <Header />
        <ul>
          {this.state.goals.map(function (goal) {
            return <li>{goal.title}
              <button onClick={that.handleDestroy.bind(this, goal.id)}>Delete</button>
              <button>Complete</button>
            </li>
          })}
        </ul>
        <Content />
      </main>
      )
    }
  });

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<App />, document.getElementById("content") )
});
