var Channel = require('../models/channel');
var baseCmd = require('./baseCmd');

module.exports = Newsfeed;


function Newsfeed() {
  if (!(this instanceof Newsfeed)) return new Newsfeed();
  this.data = null;
  this.error = null;
};

Newsfeed.prototype = baseCmd;

Newsfeed.prototype.run = function (data, callback) {
  var self = this;
  if(data.position.name =='group') {
    FeedGroup
    .find({group_id:data.position.id})
    .populate('Feed')
    .limit(5)
    .exec(function(err, docs) {
      return callback(self._buildNewsfeedUser(docs));
    });
  } else (data.position.name == 'user') {
    FeedUser
    .find({to_id:data.position.id})
    .populate('Feed')
    .limit(5)
    .exec(function(err, docs) {
      return callback(self._buildNewsfeedHome(docs));
    });
  }
};

Newsfeed.prototype.callCmd = function(results, callback) {
  this.data = results;
  callback(this.getString());
};
