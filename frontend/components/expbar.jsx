var React = require('react');

var Expbar = React.createClass({
  contextTypes: {
      user: React.PropTypes.object.isRequired,
      completedGoalCount: React.PropTypes.number.isRequired
   },

  helperFunction: function(){
    if (this.context.user.exp !== undefined){
      var currentExp = this.context.user.exp;
      var expToNextLvl = lvlToExp(this.context.user.level + 1);
      var currentExpLvl = lvlToExp(this.context.user.level);
      var ratio = (currentExp - currentExpLvl)/(expToNextLvl - currentExpLvl);
      return ratio;
    } else {
      return 0;
    }
  },


  render: function() {
    if (this.context.user.level === undefined) {return <div></div>}
    else{
      var num = this.helperFunction() * 100;
      var expStyle = {width: num.toString() + "%"};
      var currentExp = this.context.user.exp - lvlToExp(this.context.user.level);
      var nextLvl = lvlToExp(this.context.user.level + 1) - lvlToExp(this.context.user.level)
      var expId = currentExp.toString() + "/" + nextLvl.toString()

      return(<bar>
        <div className="exp-empty">
          <div className="expbar glossy yellow" style={expStyle}>
            <span className="tag">{expId}</span>
          </div>
        </div>
        </bar>
      )
    };
  }
});



var lvlToExp = function(lvl)
{
  var xpAry = function(max)
  {
    if ( max === 2 ){
      return [20];
    } else if (max < 2){
      return [0]
    }
    else
    {
      oldAry = xpAry(max - 1);
      oldAry.push( oldAry[oldAry.length - 1] + 20);
      return oldAry;
    }
  };
  return xpAry(lvl).reduce(function(sum, num) {return sum + num});
};

var expToLvl = function(exp) {
  if (exp <= 20) {return 1};
  var lvl;
  for (var i = 2; exp % lvlToExp(i) < exp; i++) {
    lvl = i
  };
  return lvl;
};


module.exports = Expbar;
