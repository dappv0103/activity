var Feed = require('../models/feed');
var Notification = require('../models/notification');
var baseCmd = require('./baseCmd');

module.exports = removeCmd;


function removeCmd() {
  this.data = null;
  this.error = null;
};

removeCmd.prototype = baseCmd;

removeCmd.prototype.run  = function(data) {
  Feed.remove(data);
  Notification.remove(data);
  this.data = {
    result:'ok'
  };
  callback(this.getString());
};

