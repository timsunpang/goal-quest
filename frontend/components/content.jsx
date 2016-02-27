var React = require('react'),
    ReactDOM = require('react-dom'),
    Sidebar = require('./sidebar.jsx');
    MainContent = require('./maincontent.jsx');

var Content = React.createClass({
  render: function() {
    return(
      <content className="content group">
        <Sidebar />
        <MainContent />
      </content>
    )
  }
});

module.exports = Content;
