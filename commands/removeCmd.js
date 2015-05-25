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
