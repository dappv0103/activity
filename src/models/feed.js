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
  var keyPrefix = this.keyPrefix+':'+this._channelName;
  redis.zadd(key, data.rank, data.object);
  key = keyPrefix + ':' + data.object + ':' + data.verb;
  redis.zadd(key, Date.now(), data.actor);
  key +=
  redis.zadd()
}

Feed.prototype._addActivity = function(data) {
  
}
