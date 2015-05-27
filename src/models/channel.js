var model = require('../db/mongo/model');

function Channel() {
   this.id = null;
   this.channel = null;
   this.feeds = [];
   this.notifications = [];
}

Channel.prototype = model;

Channel.NEWS_FEED = 'feeds';
Channel.NOTIFICATION = 'notifications';

Channel.prototype.add = function(name) {
	
  var channel = new Channel();
  channel.channel = name;
  return channel.insert();
}

Channel.prototype.set = function(field, data) {
  this[field] = data;
  return this.update();
}

Channel.prototype.get = function(field) {
  return this.find(field);
}
