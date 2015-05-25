var Redis = require('../db/redis');

module.exports = User;


function User() {
  
};

User.prototype.find(query, callback) {
  if(var user = query.following) {
    // newsfeed
    Redis.zrange('following_user' + user, function(err, reply) {
      return callback(reply);
    });
  } else if(var user = query.notify) {
    
    // notification
    Redis.zrange('notification_from_' + user, function(err, reply) {
      return callback(reply);
    });
  };
}
