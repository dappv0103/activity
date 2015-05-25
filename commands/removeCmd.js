var Feed = require('../models/feed');
var Notification = require('../models/notification');

module.exports = removeCmd;


function removeCmd() {
  this.data = null;
  this.error = null;
};

removeCmd.prototype.run(data) {
  Feed.remove(data);
  Notification.remove(data);
  this.data = {
    result:'ok'
  };
  return this;
};

removeCmd.prototype.getResult() {
  if(this.data == null) {
    this.data = this.getError();
  }
  return this.data();
};

removeCmd.prototype.getError() {
  return this.error;
};

removeCmd.prototype.getString() {
  
}


