var Mongo = require('../db/mongo');
module.exports = Feed;

function Feed() {
  this.mongo = Mongo.collenction('newsfeed');
};

Feed.get = function (query, callback) {
  this.mongo.find({hash: query}, function(err, results) {
    return callback(err, results);
  });
};
