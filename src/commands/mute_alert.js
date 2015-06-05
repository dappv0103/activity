var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = MuteAlertCmd;


function MuteAlertCmd() {
  if (!(this instanceof MuteAlertCmd)) return new MuteAlertCmd();
  this.data = null;
  this.error = null;
};

MuteAlertCmd.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data {verb, actor, object}
 * @param Function  callback
 */
MuteAlertCmd.prototype.run = function (data, callback) {
  
  var self = this;
  
  // Thêm hoạt động mới
  AlertMap.remove(data.object, function(err, count) {
    self.data = {
      result: '1',
      count: count
    };
    return callback(this.getString());
  });
  
  
  
};
