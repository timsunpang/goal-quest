var React = require('react');
var ApiUtil = require('./../util/apiUtil.js');
var ItemStore = require('./../stores/ItemStore.jsx');

var Shop = React.createClass({

  getInitialState: function() {
    return {items: ItemStore.retrieveAll()};
  },

  _onChange: function() {
    this.setState({items: ItemStore.retrieveAll()});
  },

  componentDidMount: function() {
    this.itemListener = ItemStore.addListener(this._onChange);
    ApiUtil.fetchAllItems();
  },

  componentWillUnmount: function() {
    this.itemListener.remove();
  },

  render: function(){
    var items = this.state.items.map(function(item) {
      return (
        <div className="item">
          <picture><img src={item.picture_url}/></picture>
          {item.name}<br/>
          {item.price} Gold<br/>
          <tag>{item.description}</tag>
        </div>
      )
    })

    return (
    <div>
      <div className="shop-header animated flipInX">
          <img src="http://i64.tinypic.com/24mxlko.png" />
          <h2>Shop</h2>
      </div>
      <div className="shop-list animated bounceIn">
        {items}
      </div>
    </div>
  )}
});

module.exports = Shop;
