var mongoose = require('mongoose');
var Notification = mongoose.model('Notification');
var baseCmd = require('./base_cmd');
var NotificationBuilder = require('../builders/notification');
module.exports = NotificationCmd;


function NotificationCmd() {
  if (!(this instanceof NotificationCmd)) return new NotificationCmd();
  this.data = null;
  this.error = null;
};

NotificationCmd.prototype = baseCmd;

/**
 * List notification
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
      items: NotificationBuilder.render(docs),
      page: {
        perPage: perPage,
        current: page
      }
    };
    return callback(self.getString());
  });
};

