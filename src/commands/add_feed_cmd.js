var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var FeedUser = mongoose.model('FeedUser');
var baseCmd = require('./baseCmd');

module.exports = addCmd;


function addCmd() {
  if (!(this instanceof addCmd)) return new addCmd();
  this.data = null;
  this.error = null;
};

addCmd.prototype = baseCmd;

addCmd.prototype.run = function (data, callback) {
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
    
    // List user following from user or group
    var users = [1,2];
    // Khởi tạo newsfeed đến vị trí
    doct.createNewsfeedPosition();
  });
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
