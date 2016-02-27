var React = require('react'),
    ReactDOM = require('react-dom');

var MainContent = React.createClass({
  render: function() {
    return(
      <main className="content-main">
      <div id="card">
        <div id="goal-title">
          Goals
        </div>
        <div id="goals">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </div>
    </main>
    )
  }
});

module.exports = MainContent;
