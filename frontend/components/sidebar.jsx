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


var lvlToExp = function(lvl)
{
  var xpAry = function(max)
  {
    if ( max === 1 )
    {
      return [4];
    }
    else
    {
      oldAry = xpAry(max - 1);
      oldAry.push( oldAry[oldAry.length - 1] + 4);
      return oldAry;
    }
  };
  return xpAry(lvl).reduce(function(sum, num) {return sum + num});
};

var expToLvl = function(exp) {
  var lvl;
  for (var i = 1; exp % lvlToExp(i) < exp; i++) {
    lvl = i
  };
  return lvl;
};

module.exports = Sidebar;
