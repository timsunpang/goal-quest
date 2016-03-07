var React = require('react'),
    ReactDOM = require('react-dom'),
    GoalList = require('./GoalList.jsx'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    GoalStore = require('../stores/GoalStore.jsx'),
    NotificationStore = require('../stores/NotificationStore.jsx'),
    ApiUtil = require('../util/apiUtil.js'),
    ApiActions = require('../actions/apiActions.js');

var MainContent = React.createClass({

  mixins: [LinkedStateMixin],

  contextTypes: {
    user: React.PropTypes.object,
    completedGoalCount: React.PropTypes.number,
  },

  getInitialState: function() {
    return {
      adding: false,
      title: '',
      description: '',
      notification_id: 1
    };
  },

  _onChangeNotification: function(){
    if (NotificationStore.lastId() >= 1)
      this.setState({notification_id: NotificationStore.lastId() + 1})
    else {
      this.setState({notification_id: 1})
    }
  },

  componentDidMount: function(){
    this.notificationListener = NotificationStore.addListener(this._onChangeNotification);
  },

  componentWillUnmount: function(){
    this.notificationListener.remove();
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

  toggleAdding: function() {
    this.setState({adding: !this.state.adding});
  },

  confirmChanges: function(e){
    e.preventDefault();
    ApiUtil.newGoal({title: this.state.title, description: this.state.description})
    this.setState({adding: false});
  },

  render: function() {
    if (this.state.adding) {
      return (
        <main className="content-main">
        <div id="card-container">
          <div id="card">
            <div id="goal-title-gradient">
              <div id="goal-title">
                Goals
                <p>
                  <button className="button remove icon" onClick={this.toggleAdding}> Cancel </button>
                  <input type="submit" value="Add" form="addform" className= "button add icon" id="add_button"/>
                </p>
              </div>
            </div>
            <div>
              <form onSubmit={this.confirmChanges}>
                <p>
                  <label htmlFor="add_title">Title</label>
                  <input type= "text" id="add_title" valueLink={this.linkState("title")}></input>
                </p>
              </form>
              <form id="addform" onSubmit={this.confirmChanges}>
                <p>
                  <label htmlFor="add_description">Description</label>
                </p>
                <p>
                  <textarea id="add_description" className="styled_form" valueLink={this.linkState("description")}></textarea>
                </p>
              </form>
            </div>
            <div id="goals-gradient">
              <div id="goals">
                <GoalList user={this.props.user} completedGoalCount={this.props.completedGoalCount}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    )} else {
      return (
        <main className="content-main">
          <div id= "card-container">
            <div id="card" className="animated flipInY">
              <div id="goal-title-gradient">
                <div id="goal-title">
                  Goals
                </div>
              </div>
              <div id="goal-picture-gradient">
                <div id="goal-picture">
                </div>
              </div>
              <div id="goal-add-gradient">
                <div id="goal-add">
                  <center><p><button id="goal-button" className="button add icon" onClick={this.toggleAdding}> Add </button></p></center>
                </div>
              </div>
              <div id="goals-gradient">
                <div id="goals">
                  <GoalList user={this.props.user} completedGoalCount={this.props.completedGoalCount}/>
                </div>
              </div>
            </div>
          </div>
        </main>
      )};
    }
});

module.exports = MainContent;
