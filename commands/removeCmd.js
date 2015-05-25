var Feed = require('../models/feed');
var Notification = require('../models/notification');

module.exports = removeCmd;


function removeCmd() {
  this.data = null;
  this.error = null;
};

removeCmd.prototype.run  = function(data) {
  Feed.remove(data);
  Notification.remove(data);
  this.data = {
    result:'ok'
  };
  return this;
};

removeCmd.prototype.getResult = function() {
  if(this.data == null) {
    this.data = this.getError();
  }
  return this.data();
};

removeCmd.prototype.getError = function() {
  return this.error;
};

removeCmd.prototype.getString = function() {
  return JSON.stringify(this.getResult());
};


