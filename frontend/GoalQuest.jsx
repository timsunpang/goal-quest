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
    ApiUtil = require('./util/apiUtil'),
    GoalStore = require('./stores/GoalStore'),
    UserStore = require('./stores/UserStore');


var App = React.createClass({
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

  childContextTypes: {
        user: React.PropTypes.object.isRequired,
        completedGoalCount: React.PropTypes.number.isRequired
   },

  getChildContext: function() {
    return {
      completedGoalCount: this.state.completedGoalCount,
      user: this.state.user
    }
  },

  render: function(){
    var that = this;
    return (
      <main>
        <Header />
          <content className="content group">
            <Sidebar />
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
    </Route>
  );

document.addEventListener("DOMContentLoaded", function(){
  ReactDOM.render(<Router>{routes}</Router>, document.getElementById("content") )
});
