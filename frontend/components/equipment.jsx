var React = require('react');
var ApiUtil = require('./../util/apiUtil.js');
var ItemStore = require('./../stores/ItemStore.jsx');
var ApiActions = require('../actions/apiActions.js');
var NotificationStore = require('../stores/NotificationStore.jsx');

var Equipment = React.createClass({

  contextTypes: {
      user: React.PropTypes.object.isRequired,
      completedGoalCount: React.PropTypes.number.isRequired
   },

  getInitialState: function() {
    return {items: ItemStore.allMyEquipment(),
            notification_id: 1};
  },

  _onChangeNotification: function(){
    if (NotificationStore.lastId() >= 1)
      this.setState({notification_id: NotificationStore.lastId() + 1})
    else {
      this.setState({notification_id: 1})
    }
  },


  _onChangeEquipment: function() {
    this.setState({items: ItemStore.allMyEquipment()});
  },

  componentDidMount: function() {
    this.itemListener = ItemStore.addListener(this._onChangeEquipment);
    this.notificationListener = NotificationStore.addListener(this._onChangeNotification);
    ApiUtil.fetchAllEquipment();
  },

  componentWillUnmount: function() {
    this.itemListener.remove();
    this.notificationListener.remove();
  },

  handleEquipmentClick: function(item) {

    if (item.item_type === "armor") {
      if (item.equipped === false) {
        equipped_item = {};

        switch(item.armor_type) {
          case 'face':
          equipped_item.face_id = item.id;
          ItemStore.getItem(this.context.user.face_id).equipped = false;
          break;
          case 'head':
          equipped_item.head_id = item.id;
          ItemStore.getItem(this.context.user.head_id).equipped = false;
          break;
          case 'body':
          equipped_item.body_id = item.id;
          ItemStore.getItem(this.context.user.body_id).equipped = false;
          break;
          case 'legs':
          equipped_item.legs_id = item.id;
          ItemStore.getItem(this.context.user.legs_id).equipped = false;
          break;
          case 'weapon':
          equipped_item.weapon_id = item.id;
          ItemStore.getItem(this.context.user.weapon_id).equipped = false;
          break;
          case 'shield':
          equipped_item.shield_id = item.id;
          ItemStore.getItem(this.context.user.shield_id).equipped = false;
          break;
        };
        ApiUtil.changeArmor(this.context.user.id, equipped_item);
        this.addNotification(item.name + " equipped");
      } else {
        equipped_item = {};

        switch(item.armor_type) {
          case 'face':
          equipped_item.face_id = 100
          break;
          case 'head':
          equipped_item.head_id = 101
          break;
          case 'body':
          equipped_item.body_id = 102
          break;
          case 'legs':
          equipped_item.legs_id = 103
          break;
          case 'weapon':
          equipped_item.weapon_id = 104
          break;
          case 'shield':
          equipped_item.shield_id = 105
          break;
        };
        ApiUtil.changeArmor(this.context.user.id, equipped_item);
        this.addNotification(item.name + " unequipped");
      }
      item.equipped = !item.equipped
    } else {
      this.addNotification(item.name + " used");
      ApiUtil.useItem(this.context.user.id, item.id);
    }
  },

  addNotification: function(message) {
    var id = this.state.notification_id;

    var notification = {
      id: id,
      title: "Notification:",
      message: message
    };

    ApiActions.addNotification(notification);
  },

  render: function(){
    var that = this;

    if (this.state.items.length > 0) {
      var items = this.state.items.map(function(item, i) {
        var boundItemClick = that.handleEquipmentClick.bind(that, item)

        return (
          <div className="item" key={i} onClick={boundItemClick}>
          <picture><img src={item.picture_url}/></picture>
          <br/>{item.name}<br/>
          <tag>{item.description}</tag>
          </div>
        )
      });
    } else {
      var items = <div className = "empty-eqpmt">Oops, it looks like you have no items! <br/>
                  Buy something in the store first!</div>
    }

    return (
    <div className="equipment-container">
      <div className="equipment-header animated zoomIn">
          <h2>Equipment</h2>
      </div>
      <div className="equipment-list animated bounceIn">
        {items}
      </div>
    </div>
  )}
});

module.exports = Equipment;
