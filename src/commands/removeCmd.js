var Feed = require('../models/feed');
var Notification = require('../models/notification');
var baseCmd = require('./baseCmd');

module.exports = removeCmd;


function removeCmd() {
  if (!(this instanceof addCmd)) return new addCmd();
  this.data = null;
  this.error = null;
};

removeCmd.prototype = baseCmd;

removeCmd.prototype.run  = function(data, callback) {
  Feed.remove(data);
  Notification.remove(data);
  this.data = {
    result:'ok'
  };
  callback(this.getString());
};

