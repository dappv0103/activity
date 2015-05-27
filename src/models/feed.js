var Channel = require('./channel');
module.exports = Feed;


function Feed() {
  if (!(this instanceof Feed)) return new Feed();
};

Feed.prototype.channel = function(channel) {
  return Channel.channel(channel);
}



Feed.prototype.add = function(users, data) {
  var self = this;
  var new_data = data;
  for(var i =0; i < users.length; i++) {
    new_data.user_id = users[i];
    this.channel.add(Channel.NEWS_FEED, new_data);
  }
};

Feed.prototype.remove = function() {
  return channel.channel(this.channel).remove(Channel.NEWS_FEED);
};

Feed.prototype.find = function (callback) {
  return channel.channel(this.channel).find(Channel.NEWS_FEED, callback);
};
