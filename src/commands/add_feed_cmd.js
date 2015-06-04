var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = addFeedCmd;


function addFeedCmd() {
  if (!(this instanceof addFeedCmd)) return new addFeedCmd();
  this.data = null;
  this.error = null;
};

addFeedCmd.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data
 * @param Function  callback
 */
addFeedCmd.prototype.run = function (data, callback) {
  var self = this;
  
  // Tạo feed khi có hành động đăng đối tượng nào đấy
  var feed = new Feed({
    object: data.object,
    created_by: data.created_by,
    position: data.position,
    meta: data.meta,
    ranking: data.ranking,
    privacy: data.privacy;
  });
  
  feed.save(function(err) {
    // Log error
    feed.createNewsfeedPosition();
  });
  
  this.data = {
    result: 'ok'
  };
  return callback(this.getString());
};
