var React = require('react');

var Footer = React.createClass({
  render: function(){
    return (
      <footer className="footer">
        <nav className="footer-nav group">
            <div className="footer-nav-copyright">
              © 2016 Tim Pang.
            </div>
          <ul className="footer-nav-list group">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </footer>
      )
    }
  });

module.exports = Footer;
