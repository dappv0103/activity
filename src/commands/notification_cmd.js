var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = NotificationCmd;


function NotificationCmd() {
  if (!(this instanceof NotificationCmd)) return new NotificationCmd();
  this.data = null;
  this.error = null;
};

NotificationCmd.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data {verb, actor, object}
 * @param Function  callback
 */
NotificationCmd.prototype.run = function (data, callback) {
  
  var self = this;
  
  // Thêm hoạt động mới
  Feed.activity(
      data.verb, 
      data.actor, 
      data.object
  );
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
