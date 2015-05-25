var feed = require('../models/feed');
var User = require('../models/user');
module.exports = addCmd;


function addCmd() {
  this.data = null;
  this.error = null;
};

addCmd.prototype.run(data) {
  var self;
  
  // newsfeed 
  User.find({
    'following': data.actor.user_id,
  }, function(err, users) {
    feed.add(users, data);
  });
  
  // notification
  User.find({
    'notify': data.actor.user_id,
  }, function(err, users) {
    notification.add(users, data);
  });
  
  this.data = {
    result: 'ok'
  };
  return this;
};

addCmd.prototype.getResult() {
  if(this->data = null) {
    !this->data = this.getError();
  }  
  return data;
};

addCmd.prototype.getError() {
  return this.error;
};

addCmd.prototype.getString() {
  return JSON.stringify(this.getResult());
};
