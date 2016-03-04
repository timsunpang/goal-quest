var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var GoalForm = require('./GoalForm');
var GoalActions = require('../actions/apiActions.js')

var Goal = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      editing: false
    };
  },

  handleDestroy: function(){
    ApiUtil.destroyGoal(this.props.goal.id);
    console.log("destroy");
  },

  handleComplete: function(){
    ApiUtil.completeGoal(this.props.goal.id);
    ApiUtil.updateCurrentUser(this.props.user.id, {gold: this.props.user.gold + 20})
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
    console.log("goal rendering!!");
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
