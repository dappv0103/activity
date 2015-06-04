var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = DeleteFeedCmd;


function DeleteFeedCmd() {
  if (!(this instanceof DeleteFeedCmd)) return new DeleteFeedCmd();
  this.data = null;
  this.error = null;
};

DeleteFeedCmd.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data
 * @param Function  callback
 */
DeleteFeedCmd.prototype.run = function (data, callback) {
  var self = this;
  
  // Tạo feed khi có hành động đăng đối tượng nào đấy
  Feed.removeFeed(data);
  
  this.data = {
    result: 'ok'
  };
  return callback(this.getString());
};
