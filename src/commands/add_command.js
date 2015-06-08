var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = AddCommand;


function AddCommand() {
  if (!(this instanceof AddCommand)) return new AddCommand();
  this.data = null;
  this.error = null;
};

AddCommand.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data :
 *                    - created_by
 *                      - id
 *                      - name
 *                      - avatar
 *                    - object
 *                      - id
 *                      - type
 *                      - content
 * 
 *                    - position
 *                      - id
 *                      - name
 *                    - meta
 *                    - privacy
 * @param Function  callback
 */
AddCommand.prototype.run = function (data, callback) {
  var self = this;
  var _result = {};
  var feed = new Feed(data);
  feed.save(function(err) {
    if(err) {
      _result.success = false;
    } else {
      _result.success = true;
      _result.position = feed.position;
      _result.object = feed.object;
      _result.meta = feed.meta;
      _result.created_at = feed.created_at;
    }
    self.data = _result;
    return callback(self.getString());
  });
};
