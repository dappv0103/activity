var Channel = require('./channel');
module.exports = Feed;


function Feed() {
  if (!(this instanceof Feed)) return new Feed();
  this._channelName = null;
  this.keyPrefix = 'Newsfeed#_';
};

/**
 * Open
 */
Feed.prototype.open = function(name) {
  this._channelName = name;
  return this;
}


Feed.prototype.add = function(data) {
  var self = this;
  var key = this.keyPrefix+':'+this._channelName;
  redis.zadd(key, data.rank, data.object);
  key +=':' + data.object;
  redis.zadd(key, Date.now(), data.actor);
}

Feed.prototype._addActivity = function(data) {
  
}
