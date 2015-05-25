

module.exports = User;


function User() {
  
};

User.prototype.find(query, callback) {
  if(var user = query.following) {
    Redis.zrange('following_user' + user, function(err, reply) {
      return callback(reply);
    });
  }
}
