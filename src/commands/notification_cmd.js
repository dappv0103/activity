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
  
  Notification
  .find({to_id: data.to_id})
  .populate('Feed')
  .exec(function(err, docs) {
    self.setData(self._buildRenderNotification(docs));
    return callback(self.getString());
  });
};
