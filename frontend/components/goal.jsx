var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var ApiActions = require('../actions/apiActions.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var GoalForm = require('./GoalForm');
var NotificationStore = require('../stores/NotificationStore.jsx');


var Goal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      editing: false,
      notification_id: 1
    };
  },

  handleDestroy: function(){
    ApiUtil.destroyGoal(this.props.goal.id);
    this.addNotification("Goal deleted", "")
  },

  handleComplete: function(){
    ApiUtil.completeGoal(this.props.goal.id);
    ApiUtil.updateCurrentUser(this.props.user.id, {gold: this.props.user.gold + 20});
    this.addNotification("Goal completed!", "20 gold + 5 exp earned");
  },

  handleEdit: function(){
    this.setState({
      editing: !this.state.editing
    });
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

  addNotification: function(title, message) {
    var id = this.state.notification_id;

    var notification = {
      id: id,
      title: title,
      message: message
    };

    ApiActions.addNotification(notification);
  },

  render: function() {
    if(this.state.editing){
      return (
        <div>
          <GoalForm goal={this.props.goal} handleEdit={this.handleEdit}/>
          <div>
            <button className= 'button icon trash' onClick={this.handleDestroy}></button>
            <button className= 'button icon remove' onClick={this.handleEdit}></button>
            <input type="submit" value="confirm" form="editform" className= "button icon approve"/>
          </div>
        </div>
      )
    } else {
      return (
        <div className="goal-element">
          {this.props.goal.title}
          <div>
            <button id="hidden_button" className= 'button icon trash' onClick={this.handleDestroy}/>
            <button id="hidden_button" className= 'button icon edit' onClick={this.handleEdit}/>
            <button id="hidden_button" className= "button icon approve" onClick={this.handleComplete}/>
          </div>
        </div>
      )
    }
  }

});

module.exports = Goal;
