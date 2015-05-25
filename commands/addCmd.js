var feed = require('../models/feed');

module.exports = addCmd;


function addCmd() {
  this.data = null;
  this.error = null;
};

addCmd.prototype.run(data) {
  var self;
  var users = user.find({
    'following': data.actor.user_id,
  }).getIds();
  feed.add(users, data);
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
