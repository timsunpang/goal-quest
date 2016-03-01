var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('./util/apiUtil'),
    GoalStore = require('./stores/GoalStore');
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    hashHistory = ReactRouter.hashHistory,
    Header = require('./components/header.jsx'),
    Content = require('./components/content.jsx'),
    Footer = require('./components/footer.jsx');


var App = React.createClass({

  getInitialState: function(){
    return {goals: GoalStore.all(),
      completedGoalCount: GoalStore.allCompleted().length};
  },

  _onChange: function(){
    this.setState({
      goals: GoalStore.all(),
      completedGoalCount: GoalStore.allCompleted().length
    })
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
        <Content completedGoalCount={this.state.completedGoalCount}/>
        <Footer />
      </main>
      )
    }
  });

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<App />, document.getElementById("content") )
});
