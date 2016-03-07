var React = require('react');
var ApiUtil = require('./../util/apiUtil.js');
var ItemStore = require('./../stores/ItemStore.jsx');
var NotificationStore = require('../stores/NotificationStore.jsx');
var ApiActions = require('../actions/apiActions.js');


var Shop = React.createClass({

  getInitialState: function() {
    return {items: ItemStore.retrieveAll(),
            notification_id: 1};
  },

  contextTypes: {
    user: React.PropTypes.object
  },

  _onChange: function() {
    this.setState({items: ItemStore.retrieveAll()});
  },

  _onChangeNotification: function(){
    if (NotificationStore.lastId() >= 1)
      this.setState({notification_id: NotificationStore.lastId() + 1})
    else {
      this.setState({notification_id: 1})
    }
  },

  componentDidMount: function() {
    this.itemListener = ItemStore.addListener(this._onChange);
    this.notificationListener = NotificationStore.addListener(this._onChangeNotification);
    ApiUtil.fetchAllItems();
  },

  componentWillUnmount: function() {
    this.itemListener.remove();
    this.notificationListener.remove();
  },

  handlePurchase: function(item) {
    if (this.context.user.gold < item.price) {
      this.addNotification("Error", "Not enough gold")
    } else {
      this.addNotification(item.name + " purchased", "")
      ApiUtil.updateCurrentUser(this.context.user.id, {gold: this.context.user.gold - item.price})
      ApiUtil.purchaseNewItem(item.id)
    };
  },

  addNotification: function(title, message) {
    var id = this.state.notification_id;

    var notification = {
      id: id,
      title: title,
      message: message
    };

    ApiActions.addNotification(notification);
  },

  render: function(){
    var that = this;
    var items = this.state.items.map(function(item, i) {
      var boundItemClick = that.handlePurchase.bind(that, item);
      return (
        <div className="item" key={i} onClick={boundItemClick}>
          <picture><img src={item.picture_url}/></picture>
          <br/>{item.name}<br/>
          {item.price} Gold<br/>
          <tag>{item.description}</tag>
        </div>
      )
    })

    return (
    <div className="shop-container">
      <div className="shop-header animated flipInX">
          <h2>Shop</h2>
      </div>
      <div className="shop-list animated bounceIn">
        {items}
      </div>
    </div>
  )}
});

module.exports = Shop;
