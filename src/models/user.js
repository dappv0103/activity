var Redis = require('../db/redis');

module.exports = User;


function User() {
  if (!(this instanceof User)) return new User();
  this.redis = Redis.client;
};

User.prototype.find = function(query, callback) {
  var key = '';
  if(var user = query.following) {
    key = 'following_user:' + user;
  } else if(var user = query.notify) {
    key = 'notification_from_user:' + user;
  };
  
  this.redis.zrange(key, function(err, reply) {
    return callback(reply);
  });
}
