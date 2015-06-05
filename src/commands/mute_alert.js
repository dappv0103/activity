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
  
  if(data.mute === false) {
    AlertMap.findOne({object: data.object, user_id: data.user_id}, function(err, doct) {
      if(!doct) {
        AlertMap.insert({
          user_id: data.user_id,
          object:data.object
        }, function(err, docs) {
          self.data = {
            result: '1',
            count: 1
          };
          return callback(self.getString());
        });
      }
    });
  } else {
    // Thêm hoạt động mới
    AlertMap.remove({user_id: data.user_id, object: data.object}, function(err, count) {
      self.data = {
        result: '1',
        count: count
      };
      return callback(self.getString());
    });
  }
  
  
};
