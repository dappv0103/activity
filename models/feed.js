var Mongo = require('../db/mongo');
module.exports = Feed;

function Feed() {
  this.mongo = Mongo.collenction('newsfeed');
};

Feed.prototype.add = function(users, data) {
  
  for(var i =0; i < users.length; i++) {
    
    var new_data = data;
    new_data.user_id = users[i];
    this.mongo.insert(new_data);
    
    this.clearCache(users);
  }
  
  
  
  
};

Feed.prototype.remove = function(query) {
  this.mongo.find(query, function(err,reply) {
    reply.delete();
  });
};

Feed.prototype.get = function (query, callback) {
  this.mongo.find({hash: query}, function(err, results) {
    return callback(err, results);
  });
};
