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

  confirmChanges: function(e){
    e.preventDefault();
    ApiUtil.updateGoal(this.props.goal.id, this.state)
    this.props.handleEdit();
  },

  buttonConfirmChanges: function(){
    ApiUtil.updateGoal(this.props.goal.id, this.state)
  },

  render: function() {
    return (<div>
        <form onSubmit={this.confirmChanges}>
          <p>
            <label htmlFor="title">Title</label>
            <input type= "text" id="title" valueLink={this.linkState("title")}></input></p>
        </form>
        <form id="editform" onSubmit={this.confirmChanges}>
          <p>
            <label htmlFor="description">Description</label>
            <textarea id="description" className="styled_form" valueLink={this.linkState("description")}></textarea>
          </p>
        </form>
      </div>)
    }
});

module.exports = GoalForm;
