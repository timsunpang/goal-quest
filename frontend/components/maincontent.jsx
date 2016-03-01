var React = require('react'),
    ReactDOM = require('react-dom'),
    GoalList = require('./GoalList.jsx'),
    LinkedStateMixin = require('react-addons-linked-state-mixin');


var MainContent = React.createClass({

  mixins: [LinkedStateMixin],

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

  confirmChanges: function(){

  },

  render: function() {
    if (this.state.adding) {
      return (
        <main className="content-main">
        <div id="card">
          <div id="goal-title">
            Goals
            <button className="button remove icon" onClick={this.toggleAdding}> Cancel </button>
          </div>
          <div>
            <form onSubmit={this.confirmChanges}>
              <p><input type= "text" valueLink={this.linkState("title")}></input></p>
            </form>
            <form id="editform" onSubmit={this.confirmChanges}>
              <p><textarea valueLink={this.linkState("description")}></textarea></p>
            </form>
          </div>
          <div id="goals">
            <GoalList />
          </div>
        </div>
      </main>
    )} else {
      return (
        <main className="content-main">
          <div id="card">
            <div id="goal-title">
              Goals
              <button className="button add icon" onClick={this.toggleAdding}> Add </button>
            </div>
            <div id="goals">
              <GoalList />
              </div>
            </div>
        </main>
      )};
    }
});

module.exports = MainContent;
