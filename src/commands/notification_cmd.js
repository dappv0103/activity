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
  var perPage = data.page.perPage;
  var page = Math.max(0, data.page.current);
  
  Notification
  .find({to_id: data.to_id})
  .limit(perPage)
  .skip(perPage * page)
  .exec(function(err, docs) {
    self.data = self._buildRenderNotification(docs);
    self.data.page = {
      perPage: perPage,
      current: page
    }
    return callback(self.getString());
  });
};
