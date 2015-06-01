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
  
  // add newsfeed
  var keyPrefix = this.keyPrefix+':'+this._channelName;
  redis.zadd(keyPrefix, data.rank, data.object);
  // actors
  key = keyPrefix + ':' + data.object + ':' + data.verb;
  redis.zadd(key, Date.now(), data.actor);
  // list verb
  key = keyPrefix + ':' + data.object + ':verbs';
  redis.zadd(key, Date.now(), data.verb);
}

Feed.prototype.find = function(condition) {
  var _results = [];
  var keyPrefix = this.keyPrefix+':'+this._channelName;
  var key = null;
  redis.zrange(keyPrefix,  0, -1, function(err, replies) {
    for(var i = 0; i <= replies.length, i++) {
      var result = {
        object: replies[i],
      }
      key = keyPrefix + ':' + replies[i] + ':verbs';
      redis.zrange(key, 0, 1, function(err, reply) {
        key = keyPrefix + ':' + result.object + ':' + reply;
        result.verb = reply[0];
        redis.zrange(key, 0, -1, function(err, users) {
          result.receivers = users;
        });
      });
    }
  });
}

