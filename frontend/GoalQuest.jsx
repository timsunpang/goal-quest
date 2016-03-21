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
    Shepherd = require('tether-shepherd'),
    Notifications = require('react-notifications');


var App = React.createClass({
  getInitialState: function(){
    return {goals: GoalStore.all(),
      completedGoalCount: GoalStore.allCompleted().length,
      user: UserStore.retrieve(),
      notifications: [],
      notification_id: 1,
      tour: false
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
    this.setState({user: UserStore.retrieve()});
    if (this.state.tour === false && this.state.user.exp === 0) {
      this.giveTour();
      this.setState({tour: true})
    }
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

  giveTour: function () {
    var tour = new Shepherd.Tour({
      defaults: {
        classes: 'shepherd-theme-default',
        showCancelLink: true
      }
    });

    var next = tour.next.bind(tour);

    tour.addStep('introduction-step', {
      title: 'Welcome!',
      text: 'Welcome to GoalQuest!<br/>' +
            "Let's begin with a tour!",
      attachTo: '#card-container top',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-2', {
      title: 'Welcome!',
      text: 'GoalQuest is a game where<br/>' +
            'you can track your real life goals<br/>' +
            'in a fun, interactive way!',
      attachTo: '#card-container top',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-3', {
      title: 'Avatar',
      text: 'This is your avatar. You can change the way<br/>' +
            'your avatar looks by buying more items in the shop!<br/>',
      attachTo: '.avatar-container right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-4', {
      title: 'Sidebar',
      text: 'This displays your current level, gold, and goals completed.<br/>',
      attachTo: '.profile-info h2 top',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-5', {
      title: 'HP',
      text: 'This shows your current HP. Be sure to complete<br/>' +
            'goals within 24 hours, or your HP will be reduced!',
      attachTo: '.hp-empty right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-6', {
      title: 'EXP',
      text: 'This shows your current EXP. As you complete<br/>' +
            'goals, this bar will fill up, and when it is completely <br/>' +
            'full, you will level up!',
      attachTo: '.exp-empty right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-7', {
      title: 'Goals',
      text: 'These are your goals. You can create, edit, or complete ' +
            'goals. Every time you complete a gold, you gain EXP and gold!',
      attachTo: '#card right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-8', {
      title: 'Goals',
      text: 'What you define as your goals are completely up to you. ' +
            "Choose whatever you like, but don't cheat!",
      attachTo: '#card right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-9', {
      title: 'Navigation',
      text: 'This is your navigation bar.<br/>' +
            "Click next to continue!",
      attachTo: '.header-list bottom',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: function(){
            hashHistory.push("/shop");
            setTimeout(function () {
              tour.next();
            }, 1000);
          }
        }
      ]
    });

    tour.addStep('step-10', {
      title: 'Shop',
      text: 'This is the shop. Listed are different<br/>' +
            "items, along with their prices.",
      attachTo: '.shop-list right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-11', {
      title: 'Shop',
      text: 'Click on an item to buy it, or hover<br/>' +
            "over it to see a description.",
      attachTo: '.shop-list right',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: tour.next
        }
      ]
    });

    tour.addStep('step-12', {
      title: 'Equipment',
      text: 'Now for equipment. Click next to continue!',
      attachTo: '.header-list bottom',
      when: {
        show: function () {
          window.scrollTo(0, 0);
        }
      },
      buttons: [
        {
          text: 'Next',
          action: function(){
            hashHistory.push("/equipment");
            setTimeout(function () {
              tour.next();
            }, 1000);
          }
        }
      ]
    });

  tour.addStep('step-13', {
    title: 'Equipment',
    text: 'This is your equipment page. <br/>' +
    'You can equip or consume any item you bought <br/>' +
    'by clicking on the item.',
    attachTo: '.equipment-header right',
    when: {
      show: function () {
        window.scrollTo(0, 0);
      }
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep('step-14', {
    title: 'Equipment',
    text: 'You can also unequip by ' +
    'clicking on something that you already equipped.',
    attachTo: '.equipment-header right',
    when: {
      show: function () {
        window.scrollTo(0, 0);
      }
    },
    buttons: [
      {
        text: 'Next',
        action: tour.next
      }
    ]
  });

  tour.addStep('step-15', {
    title: 'End',
    text: "That's it for the tour! Have fun!",
    attachTo: '.equipment-header right',
    when: {
      show: function () {
        window.scrollTo(0, 0);
      }
    },
    buttons: [
      {
        text: 'End',
        action: tour.complete
      }
    ]
  });

  tour.start();
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
  ReactDOM.render(<Router history={hashHistory}>{routes}</Router>, document.getElementById("content") )
});
