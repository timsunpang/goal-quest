var React = require('react'),
    ReactDOM = require('react-dom'),
    Expbar = require('./expbar.jsx'),
    UserStore = require('./../stores/UserStore'),
    GoalStore = require('./../stores/GoalStore'),
    ItemStore = require('./../stores/ItemStore'),
    NotificationStore = require('../stores/NotificationStore.jsx'),
    ApiUtil = require('./../util/apiUtil.js'),
    ApiActions = require('../actions/apiActions.js');


var Sidebar = React.createClass({
  contextTypes: {
      user: React.PropTypes.object.isRequired,
      completedGoalCount: React.PropTypes.number.isRequired
   },


  getInitialState: function(){
    return {
      user: UserStore.retrieve(),
      completedGoalCount: GoalStore.allCompleted().length,
      equippedItems: [],
      notification_id: 1
    };
  },

  _onChangeUser: function(){
    var currentLvl = this.state.user.level;
    var newUser = UserStore.retrieve();

    this.setState({user: newUser});
    this.setState({
      equippedItems: ItemStore.allEquipped(
        [this.state.user.face_id,
         this.state.user.head_id,
         this.state.user.body_id,
         this.state.user.legs_id,
         this.state.user.weapon_id,
         this.state.user.shield_id
        ]
      )});
  },

  _onChangeGoal: function(){
    this.setState({completedGoalCount: GoalStore.allCompleted().length});
    this.setUserExpLvl();
  },

  _onChangeEquipment: function(){
    this.setState({
      equippedItems: ItemStore.allEquipped(
        [this.context.user.face_id,
         this.context.user.head_id,
         this.context.user.body_id,
         this.context.user.legs_id,
         this.context.user.weapon_id,
         this.context.user.shield_id
        ]
      )});
  },

  _onChangeNotification: function(){
    if (NotificationStore.lastId() >= 1)
      this.setState({notification_id: NotificationStore.lastId() + 1})
    else {
      this.setState({notification_id: 1})
    }
  },

  componentDidMount: function(){
    this.userListener = UserStore.addListener(this._onChangeUser);
    this.goalListener = GoalStore.addListener(this._onChangeGoal);
    this.notificationListener = NotificationStore.addListener(this._onChangeNotification);
    this.equipmentListener = ItemStore.addListener(this._onChangeEquipment);
    ApiUtil.fetchCurrentUser();
    ApiUtil.fetchAllEquipment();
  },

  componentWillUnmount: function(){
    this.userListener.remove();
    this.goalListener.remove();
    this.equipmentListener.remove();
    this.notificationListener.remove();
  },

  setUserExpLvl: function(){
    var exp = this.state.completedGoalCount * 5;
    var level = expToLvl(exp);

    ApiUtil.updateCurrentUser(this.state.user.id, {exp: exp, level: level});
  },

  addNotifications: function(title) {
    var id = this.state.notification_id;

    var notification = {
      id: id,
      title: title,
      message: ""
    };

    ApiActions.addNotifications(notification);
  },

  render: function() {
    if(this.state.user.id === undefined || this.state.equippedItems[0] === undefined){
      var avatar = (
        <a href="#" className="avatar-container">
          <img src="assets/blank.png"/>
        </a>)

    } else {
      var face_url = this.state.equippedItems[0].picture_url;
      var head_url = this.state.equippedItems[1].picture_url;
      var body_url = this.state.equippedItems[2].picture_url;
      var legs_url = this.state.equippedItems[3].picture_url;
      var weapon_url = this.state.equippedItems[4].picture_url;
      var shield_url = this.state.equippedItems[5].picture_url;

      var avatar = (
        <a href="#" className="avatar-container">
          <img src={body_url}/>
          <img src={legs_url}/>
          <img src={face_url}/>
          <img src={weapon_url}/>
          <img src={shield_url}/>
        </a>
        )
    };

    return(
      <sidebar className="content-sidebar">
          {avatar}

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
              <span className="tag">50/50</span>
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
