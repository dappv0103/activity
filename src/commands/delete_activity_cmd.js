var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = DeleteActivityCmd;


function DeleteActivityCmd() {
  if (!(this instanceof DeleteActivityCmd)) return new DeleteActivityCmd();
  this.data = null;
  this.error = null;
};

DeleteActivityCmd.prototype = baseCmd;

/**
 * Xóa hành động đến đối tượng
 * 
 * @param Object    data {verb, actor, object}
 * @param Function  callback
 */
DeleteActivityCmd.prototype.run = function (data, callback) {
  
  var self = this;
  
  // Thêm hoạt động mới
  Feed.removeActivity(
      data.verb, 
      data.actor, 
      data.object
  );
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
