var Mongo = require('../db/mongo');
var feedUser = require('./feedUser');
module.exports = Feed;


function Feed() {
  this.collectionName = 'newsfeed';
  this.db = Mongo.getDb();
};

Feed.prototype.collection = function(callback) {
  this.db.collection(this.collectionName, function(err, collection) {
    return callback(collection);
  });
};

Feed.prototype.add = function(users, data) {
  var self = this;
  var new_data = data;
  this.collection(function(collection) {
    for(var i =0; i < users.length; i++) {
      new_data.user_id = users[i];
      self.push(collection, new_data);
    }
  });
};

Feed.prototype.push = function(collection, new_data) {
  collection.insert(new_data, function(err, result) {
    feedUser.channel(result.user_id).updateVersion();
  });
};

Feed.prototype.remove = function(query) {
  this.collection(function(collection) {
    collection.find(query, function(err, repies) {
      collection.remove(query, function(err, cout) {
        for(var i =0; i < repies.length; i++) {
          feedUser.channel(result.user_id).updateVersion();
        }
      });
    });
  }
};

Feed.prototype.find = function (query, callback) {
  return feedUser.find(query, callback);
};
