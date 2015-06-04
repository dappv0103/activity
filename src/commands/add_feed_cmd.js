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

addFeedCmd.prototype.run = function (data, callback) {
  var self = this;
  
  // Tạo feed khi có hành động đăng đối tượng nào đấy
  Feed.create({
    created_by: data.created_by,
    object: data.object,
    position: data.position,
    meta: data.meta,
    ranking: data.ranking,
    privacy: data.privacy
  }, function(err, doct) {
    
    // Khởi tạo newsfeed đến vị trí
    doct.createNewsfeedPosition();
  });
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
