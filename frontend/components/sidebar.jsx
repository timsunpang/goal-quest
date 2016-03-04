var React = require('react'),
    ReactDOM = require('react-dom'),
    Expbar = require('./expbar.jsx'),
    UserStore = require('./../stores/UserStore'),
    GoalStore = require('./../stores/GoalStore'),
    ApiUtil = require('./../util/apiUtil.js');

var Sidebar = React.createClass({
  contextTypes: {
      user: React.PropTypes.object.isRequired,
      completedGoalCount: React.PropTypes.number.isRequired
   },


  getInitialState: function(){
    return {
      user: UserStore.retrieve(),
      completedGoalCount: GoalStore.allCompleted().length,
    };
  },

  _onChangeUser: function(){
    this.setState({user: UserStore.retrieve()});
    console.log("User listener activated")
  },

  _onChangeGoal: function(){
    this.setState({completedGoalCount: GoalStore.allCompleted().length});
    this.setUserExpLvl();
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._onChangeUser);
    this.goalListener = GoalStore.addListener(this._onChangeGoal);
    ApiUtil.fetchCurrentUser();
  },

  componentWillUnmount: function(){
    this.userListener.remove();
    this.goalListener.remove();
  },

  setUserExpLvl: function(){
    var exp = this.state.completedGoalCount * 5;
    var level = expToLvl(exp);
    ApiUtil.updateCurrentUser(this.state.user.id, {exp: exp, level: level});
  },

  render: function() {
    if(this.state.user.id === undefined){
      return <div></div>;
    }
    return(
      <sidebar className="content-sidebar">
        <a href="#" className="avatar-container">
          <img src="/assets/sprite_body4.png"/>
          <img src="/assets/sprite_body5.png"/>
          <img src="/assets/sprite_body9.png"/>
          <img src="/assets/sprite_body2.png"/>
          <img src="/assets/sprite_body3.png"/>
        </a>


        <div className="profile-info">
          <h2>{this.context.user.username}</h2>
            <p>
              Lvl {this.context.user.level}
            </p>
            <p>
              Gold: {this.context.user.gold}
            </p>
            <p>
              Goals completed: {this.context.completedGoalCount}
            </p>
        </div>

        <ul className="profile-nav">
          <li>
            HP
            <div className="hp-empty">
              <div className="lifebar glossy green">
              </div>
            </div>
          </li>
          <li>EXP
            <Expbar user={this.state.user}/>
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

module.exports = Sidebar;
