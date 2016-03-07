var React = require('react');
var GoalStore = require('../stores/GoalStore.jsx');
var ApiUtil = require('../util/apiUtil.js');
var Goal = require('./goal.jsx');
var NotificationStore = require('../stores/NotificationStore.jsx'),
    ApiActions = require('../actions/apiActions.js');

var GoalList = React.createClass({
  getInitialState: function(){
    return { goals: GoalStore.uncompleted(),
            notification_id: 1};
  },

  _onChangeNotification: function(){
    if (NotificationStore.lastId() >= 1)
      this.setState({notification_id: NotificationStore.lastId() + 1})
    else {
      this.setState({notification_id: 1})
    }
  },

  addNotification: function(message) {
    var id = this.state.notification_id;

    var notification = {
      id: id,
      title: "Notification:",
      message: message
    };

    ApiActions.addNotification(notification);
  },

  _onChange: function(){
    this.setState({goals: GoalStore.uncompleted()});
  },

  componentDidMount: function(){
    this.notificationListener = NotificationStore.addListener(this._onChangeNotification);
    this.goalListener = GoalStore.addListener(this._onChange);
    ApiUtil.fetchAllGoals();
  },

  componentWillUnmount: function(){
    this.notificationListener.remove();
    this.goalListener.remove();
  },

  render: function(){
    var that = this;

    return  <div className="goal-list">
    <ul>
    {this.state.goals.map(function (goal, i) {
      return <li key={i} className="goal-li"> <Goal goal={goal} user={that.props.user} completedGoalCount={that.props.completedGoalCount}/>
      </li>
    })}
    </ul>
    </div>
  }
});

module.exports = GoalList;
