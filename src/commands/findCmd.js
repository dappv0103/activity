var Channel = require('../models/channel');
var baseCmd = require('./baseCmd');

module.exports = findCmd;


function findCmd() {
  if (!(this instanceof findCmd)) return new findCmd();
  this.data = null;
  this.error = null;
};

findCmd.prototype = baseCmd;

findCmd.prototype.run = function (data, callback) {
  var self = this;
  if(data.type === 'feed') {
    
    Channel.channel(data.user_id).getNewsfeed(function(results) {
      self.callCmd(results, callback);
    });
    
  } else if(data.type === 'notify') {
    
    Channel.channel(data.user_id).getNotification(function(results) {
      self.callCmd(results, callback);
    });
  }
 
};

findCmd.prototype.callCmd = function(results, callback) {
  this.data = results;
  callback(this.getString());
};
