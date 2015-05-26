




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

feedUser.prototype.updateNewsfeed = function(channel, callback) {
  
  this.findByChannel(channel, function(err, reply) {
    if(reply.new_version == true) {
      var _results = [];
      Feed.findByChannel(channel, function(err, results) {
        for(var i = 0; i < results.length; i++) {
          var hash =  results[i].object.id +':'+ results[i].object.type;
          if(!_results[hash]) {
            _results[hash] = results[i];
            _results[hash].user_receivers = [results[i].user];
          } else {
            if(_results[hash].verb === results[i].verb) {
              _results[hash].user_receivers.push(results[i].user);
            }
          }
        }
      });
    }
  });
  
 
}


feedUser.prototype.updateVersion = function(channel) {
  this.collection(function(collection) {
    collection.update({channel:channel}, {new_version: true});
  });
}


