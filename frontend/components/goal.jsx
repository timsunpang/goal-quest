var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var GoalForm = require('./GoalForm');
var GoalActions = require('../actions/goalActions.js')

var Goal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      goal: this.props.goal,
      display: this.props.goal.title,
      editing: false
    };
  },

  handleDestroy: function(){
    ApiUtil.destroyGoal(this.state.goal.id);
  },

  handleComplete: function(){
    ApiUtil.completeGoal(this.state.goal.id);
  },

  handleEdit: function(){
    if (this.state.editing) {
      this.setState({
        display: this.props.goal.title,
        editing: false
      })
    } else {
      this.setState({
        display: <GoalForm goal={this.state.goal}/>,
        editing: true
      })
    }
  },

  confirmChanges: function(){
    // GoalActions.confirmGoalChange();
    this.setState({
      editing: false,
      display: this.props.goal.title
    })
  },

  render: function() {
    var that = this;
    var button2Class = this.state.editing ? 'button icon remove' : 'button icon edit';
    var button3Callback = this.state.editing ? that.confirmChanges : that.handleComplete;
    var button2Text = this.state.editing ? 'Cancel' : 'Edit';
    var button3Text = this.state.editing ? 'Confirm' : 'Complete';
    var button3Type = this.state.editing ? 'submit' : '';
    var button3Form = this.state.editing ? 'editform' : '';

    return (<div>
      {this.state.display}
        <div>
        <button className= 'button icon trash' onClick={that.handleDestroy}>Delete</button>
        <button className= {button2Class} onClick={that.handleEdit}>{button2Text}</button>
        <button className= "button icon approve" onClick={button3Callback} type={button3Type} form={button3Form}>{button3Text}</button>
        </div>
      </div>)
    }
});

module.exports = Goal;
