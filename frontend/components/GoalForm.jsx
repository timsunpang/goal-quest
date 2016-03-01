var React = require('react');
var ApiUtil = require('../util/apiUtil.js');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var UpdateStore = require('../stores/UpdateStore.jsx');


var GoalForm = React.createClass({
  mixins: [LinkedStateMixin],

  getInitialState: function(){
    return {
      title: this.props.goal.title,
      description: this.props.goal.description
    };
  },

  componentWillMount: function(){
    UpdateStore.addListener(this.buttonConfirmChanges);
  },

  confirmChanges: function(e){
    e.preventDefault();
    ApiUtil.updateGoal(this.props.goal.id, this.state)
  },

  buttonConfirmChanges: function(){
    ApiUtil.updateGoal(this.props.goal.id, this.state)
  },

  render: function() {
    return (<div>
        <form onSubmit={this.confirmChanges}>
          <p><input type= "text" valueLink={this.linkState("title")}></input></p>
        </form>
        <form id="editform" onSubmit={this.confirmChanges}>
          <p><textarea valueLink={this.linkState("description")}></textarea></p>
        </form>
      </div>)
    }
});

module.exports = GoalForm;
