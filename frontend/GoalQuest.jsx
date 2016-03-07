var React = require('react'),
    ReactDOM = require('react-dom'),
    ReactRouter = require('react-router'),
    Router = ReactRouter.Router,
    Route = ReactRouter.Route,
    IndexRoute = ReactRouter.IndexRoute,
    hashHistory = ReactRouter.hashHistory,
    Header = require('./components/header.jsx'),
    Content = require('./components/content.jsx'),
    Footer = require('./components/footer.jsx'),
    Sidebar = require('./components/sidebar.jsx'),
    Shop = require('./components/shop.jsx'),
    Equipment = require('./components/equipment.jsx'),
    ApiUtil = require('./util/apiUtil'),
    ApiActions = require('./actions/apiActions.js'),
    GoalStore = require('./stores/GoalStore'),
    UserStore = require('./stores/UserStore'),
    NotificationStore = require('./stores/NotificationStore'),
    Notifications = require('react-notifications');


var App = React.createClass({
  getInitialState: function(){
    return {goals: GoalStore.all(),
      completedGoalCount: GoalStore.allCompleted().length,
      user: UserStore.retrieve(),
      notifications: [],
      notification_id: 1
    };
  },

  handleRequestHide: function(notification) {
    this.setState({notifications: this.state.notifications.filter(function(n){ return n.id !== notification.id})});
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

  _onChangeNotification: function(){
    var notifications = this.state.notifications
    var newNotification = NotificationStore.retrieve();

    newNotification.forEach(function(notification){
      notifications.push(notification);
    });

    this.setState({notifications: notifications})

    if (NotificationStore.lastId() >= 1)
      this.setState({notification_id: NotificationStore.lastId() + 1})
    else {
      this.setState({notification_id: 1})
    }
  },

  componentDidMount: function(){
    this.goalListener = GoalStore.addListener(this._onChangeGoal);
    this.userListener = UserStore.addListener(this._onChangeUser);
    this.notificationListener = NotificationStore.addListener(this._onChangeNotification);
    ApiUtil.fetchAllGoals();
    ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.goalListener.remove();
    this.userListener.remove();
    this.notificationListener.remove();
  },

  childContextTypes: {
        user: React.PropTypes.object.isRequired,
        completedGoalCount: React.PropTypes.number.isRequired,
        notification_id: React.PropTypes.number.isRequired
   },

  getChildContext: function() {
    return {
      completedGoalCount: this.state.completedGoalCount,
      user: this.state.user,
      notification_id: this.state.notification_id
    }
  },

  render: function(){
    return (
      <main>
        <Header />
          <content className="content group">
            <Sidebar />
            <Notifications notifications={this.state.notifications} onRequestHide={this.handleRequestHide}/>
            {this.props.children}
          </content>
        <Footer />
      </main>
      )
    }
  });

  var routes = (
    <Route path="/" component={App}>
      <IndexRoute component={Content}/>
      <Route path="shop" component={Shop}/>
      <Route path="equipment" component={Equipment}/>
    </Route>
  );

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content") )
});
