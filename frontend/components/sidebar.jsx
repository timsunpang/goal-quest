var React = require('react'),
    ReactDOM = require('react-dom');

var Sidebar = React.createClass({
  render: function() {
    return(
      <sidebar className="content-sidebar">
        <a href="#" className="profile-picture">
          <img src="http://vignette2.wikia.nocookie.net/donthugme/images/a/ac/YellowDHMIS3.png/revision/latest?cb=20141110022829" alt=""/>
        </a>
        <div className="profile-info">
          <h2>Shrigis</h2>
            <p>
              Son of Ivar the Boneless.
            </p>
        </div>

        <ul className="profile-nav">
          <li>
            HP
            <div className="hp-empty">
              <div className="lifebar">
              </div>
            </div>
          </li>
          <li>EXP
            <div className="exp-empty">
              <div className="expbar">
              </div>
            </div>
          </li>
        </ul>
    </sidebar>
    )
  }
});

module.exports = Sidebar;
