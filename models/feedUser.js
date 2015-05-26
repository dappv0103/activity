




function feedUser() {
  this.user_id = null;
  this.max_newfeed = 150;
  this.max_newsfeed_expired = 60*60*24*30;
}


feedUser.prototype.channel = function(channel) {
  this.channel = channel;
  return this;
}

feedUser.prototype.createChannel = function(channel) {
  var self = this;
  this.collection(function(collection) {
    collection.insert({
      _version: 0,
      new_version: true,
      channel: channel,
      items: []
    });
  });
};

feedUser.prototype.updateNewsfeed = function(channel) {
  Feed::findByChannel(channel, function(err, results) {
    
  });
}


feedUser.prototype.updateVersion = function(channel) {
  this.collection(function(collection) {
    collection.update({channel:channel}, {new_version: true});
  });
}


