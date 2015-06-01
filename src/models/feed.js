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
  var hash = ';';
}

Feed.prototype._addItem = function(data) {
  
}
