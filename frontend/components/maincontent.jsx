var React = require('react'),
    ReactDOM = require('react-dom'),
    GoalList = require('./GoalList.jsx');

var MainContent = React.createClass({
  render: function() {
    return(
      <main className="content-main">
      <div id="card">
        <div id="goal-title">
          Goals
          <button className="button add icon" id="goal-add"> Add </button>
        </div>
        <div id="goals">
          <GoalList />
        </div>
      </div>
    </main>
    )
  }
});

module.exports = MainContent;
