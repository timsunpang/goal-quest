var React = require('react'),
    ReactDOM = require('react-dom'),
    GoalList = require('./GoalList.jsx'),
    LinkedStateMixin = require('react-addons-linked-state-mixin'),
    GoalStore = require('../stores/GoalStore.jsx'),
    ApiUtil = require('../util/apiUtil.js');

var MainContent = React.createClass({

  mixins: [LinkedStateMixin],

  childContextTypes: {
    user: React.PropTypes.object,
    completedGoalCount: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      adding: false,
      title: '',
      description: ''
    };
  },

  toggleAdding: function() {
    this.setState({adding: !this.state.adding});
  },

  confirmChanges: function(e){
    e.preventDefault();
    ApiUtil.newGoal({title: this.state.title, description: this.state.description})
    this.setState({adding: false})
  },

  render: function() {
    if (this.state.adding) {
      return (
        <main className="content-main">
        <div id="card">
          <div id="goal-title">
            Goals
            <p>
              <button className="button remove icon" onClick={this.toggleAdding}> Cancel </button>
              <input type="submit" value="Add" form="addform" className= "button add icon" id="add_button"/>
            </p>
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
          <div id="goals">
            <GoalList user={this.props.user} completedGoalCount={this.props.completedGoalCount}/>
          </div>
        </div>
      </main>
    )} else {
      return (
        <main className="content-main">
          <div id="card" className="animated flipInY">
            <div id="goal-title">
              Goals
            </div>
            <div id="goal-picture">
              picture
            </div>
            <div id="goal-add">
              <p><button className="button add icon" onClick={this.toggleAdding}> Add </button></p>
            </div>
            <div id="goals">
              <GoalList user={this.props.user} completedGoalCount={this.props.completedGoalCount}/>
              </div>
            </div>
        </main>
      )};
    }
});

module.exports = MainContent;
