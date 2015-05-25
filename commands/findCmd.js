var Feed = require('../models/feed');
var Notification = require('../models/notification');
var baseCmd = require('./baseCmd');

module.exports = findCmd;


function findCmd() {
  this.data = null;
  this.error = null;
};

findCmd.prototype = baseCmd;

findCmd.prototype.run = function (data, callback) {
  var self = this;
  if(data.type === 'feed') {
    delete data.type;
    Feed.get(data, function(results) {
      self.callCmd(results, callback);
    });
  } else(data.type === 'notify') {
    delete data.type;
    Notification.get(data, function(results) {
      self.callCmd(results, callback);
    });
  }
 
};

findCmd.prototype.callCmd = function(results, callback) {
  self.data = results;
  callback(self.getString());
};
