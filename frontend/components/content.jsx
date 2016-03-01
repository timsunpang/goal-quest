var React = require('react'),
    ReactDOM = require('react-dom'),
    Sidebar = require('./sidebar.jsx');
    MainContent = require('./maincontent.jsx');

var Content = React.createClass({
  render: function() {
    return(
      <content className="content group">
        <Sidebar completedGoalCount={this.props.completedGoalCount}/>
        <MainContent />
      </content>
    )
  }
});

module.exports = Content;
