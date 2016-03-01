var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var GoalForm = require('./GoalForm');
var GoalActions = require('../actions/goalActions.js')

var Goal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      // goal: this.props.goal,
      // display: this.props.goal.title,
      editing: false
    };
  },

  // componentWillReceiveProps(newProps){
  //   this.setState(
  //     goal: newProps.goal
  //   });
  // },

  handleDestroy: function(){
    ApiUtil.destroyGoal(this.props.goal.id);
    console.log("destroy");
  },

  handleComplete: function(){
    ApiUtil.completeGoal(this.props.goal.id);
    console.log("complete");
  },

  handleEdit: function(){
    this.setState({
      editing: !this.state.editing
    });
  },

  confirmChanges: function(){
    // GoalActions.confirmGoalChange();
    this.setState({
      editing: false,
      display: this.props.goal.title
    })
  },

  render: function() {
    // var this = this;
    // var button2Class = this.state.editing ? 'button icon remove' : 'button icon edit';
    // var button3Callback = this.state.editing ? that.confirmChanges : that.handleComplete;
    // var button2Text = this.state.editing ? 'Cancel' : 'Edit';
    // var button3Text = this.state.editing ? 'Confirm' : 'Complete';
    // var button3Type = this.state.editing ? 'submit' : '';
    // var button3Form = this.state.editing ? 'editform' : '';
    console.log("goal rendering!!");
    if(this.state.editing){
      return (
        <div>
          <GoalForm goal={this.props.goal} handleEdit={this.handleEdit}/>
          <div>
            <button className= 'button icon trash' onClick={this.handleDestroy}>Delete</button>
            <button className= 'button icon remove' onClick={this.handleEdit}>Cancel</button>
            <input type="submit" value="Confirm" form="editform" className= "button icon approve"/>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          {this.props.goal.title}
          <div>
            <button className= 'button icon trash' onClick={this.handleDestroy}>Delete</button>
            <button className= 'button icon edit' onClick={this.handleEdit}>Edit</button>
            <button className= "button icon approve" onClick={this.handleComplete}>Complete</button>
          </div>
        </div>
      )
    }
  }

});

module.exports = Goal;
