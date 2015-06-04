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
  var perPage = data.page.perPage;
  var page = Math.max(0, data.page.current);
  
  if(data.position.name =='group') {
    FeedGroup
    .find({group_id:data.position.id})
    .populate('Feed')
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, docs) {
      self.data = self._buildNewsfeedGroup(docs);
      self.data.page = {
        perPage: perPage,
        current: page
      };
      return callback(self.getString());
    });
  } else (data.position.name == 'user') {
    FeedUser
    .find({to_id:data.position.id})
    .populate('Feed')
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, docs) {
      self.data = self._buildNewsfeedUser(docs);
      self.data.page = {
        perPage: perPage,
        current: page
      };
      return callback(self.getString());
    });
  } else {
    FeedHome
    .find({to_id:to_id})
    .populate('Feed')
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, docs) {
      self.data = self._buildNewsfeedHome(docs);
      self.data.page = {
        perPage: perPage,
        current: page
      };
      return callback(self.getString());
    });
  }
};

Newsfeed.prototype.callCmd = function(results, callback) {
  this.data = results;
  callback(this.getString());
};
