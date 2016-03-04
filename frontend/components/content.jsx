var React = require('react'),
    ReactDOM = require('react-dom'),
    Sidebar = require('./sidebar.jsx'),
    MainContent = require('./maincontent.jsx'),
    ApiUtil = require('../util/apiUtil'),
    GoalStore = require('../stores/GoalStore'),
    UserStore = require('../stores/UserStore');

var Content = React.createClass({
  getInitialState: function(){
    return {goals: GoalStore.all(),
      completedGoalCount: GoalStore.allCompleted().length,
      user: UserStore.retrieve()
    };
  },

  _onChangeGoal: function(){
    this.setState({
      goals: GoalStore.all(),
      completedGoalCount: GoalStore.allCompleted().length
    })
  },

  _onChangeUser: function(){
    this.setState({user: UserStore.retrieve()})
  },

  componentDidMount: function(){
    this.goalListener = GoalStore.addListener(this._onChangeGoal);
    this.userListener = UserStore.addListener(this._onChangeUser);
    ApiUtil.fetchAllGoals();
    ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.goalListener.remove();
    this.userListener.remove();
  },

  handleDestroy: function(id){
    ApiUtil.destroyGoal(id);
  },

  render: function() {
    return(
        <MainContent user={this.state.user} completedGoalCount={this.state.completedGoalCount}/>
    )
  }
});

module.exports = Content;
