var React = require('react'),
    ReactDOM = require('react-dom'),
    ApiUtil = require('../util/apiUtil.js'),
    hashHistory = require('react-router').hashHistory;

var Header = React.createClass({
  handleNavigation: function(e){
    e.preventDefault();
    hashHistory.push("/shop");
  },
  logout: function(e){
    e.preventDefault();
    ApiUtil.logout();
  },

  render: function(){
    return (
      <header className="header">
        <nav className="nhat_bar group">
          <h1 className="header-logo">
            <a href="#"><img src="http://i66.tinypic.com/258xhf6.png" alt="logo"/></a>
          </h1>
          <ul className="header-list group">
            <li><a onClick={this.handleNavigation} href="#">Shop</a></li>
            <li><a href="#">Equipment</a></li>
            <li><a href="#">Status</a></li>
            <li><a onClick={this.logout} href="#">Logout</a></li>
          </ul>
        </nav>
      </header>
    )
  }
});

module.exports = Header;
