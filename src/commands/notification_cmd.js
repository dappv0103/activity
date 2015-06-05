var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');
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
    self.data = {
      items: self._buildRenderNotification(docs),
      page: {
        perPage: perPage,
        current: page
      }
    };
    return callback(self.getString());
  });
};

NotificationCmd.prototype._buildRenderNotification = function(docs) {
  var _results = [];
  for(var i = 0; i <= docs.length; i++) {
    _results.push({
      _id: docs[i]._id,
      verb: docs[i].verb,
      actors: docs[i].actors,
      meta: docs[i].meta,
      is_read: docs[i].is_read
    });
  }
  return _results;
}
