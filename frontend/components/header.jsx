var React = require('react'),
    ReactDOM = require('react-dom');

var Header = React.createClass({
  render: function(){
    return (
      <header className="header">
        <nav className="nhat_bar group">
          <h1 className="header-logo">
            <a href="#">GoalQuest</a>
          </h1>
          <ul className="header-list group">
            <li><a href="#">Shop</a></li>
            <li><a href="#">Armor</a></li>
            <li><a href="#">Items</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </nav>
      </header>
    )
  }
});

module.exports = Header;
