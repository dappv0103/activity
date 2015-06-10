var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');

module.exports = Add;


function Add() {
  if (!(this instanceof Add)) return new Add();
};


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
Add.prototype.run = function (data, callback) {
  var self = this;
  var _result = {};
  var feed = new Feed(data);
  feed.save(function(err) {
    if(err) {
      _result.success = false;
      _result.messages = err;
    } else {
      _result.success = true;
      _result.position = feed.position;
      _result.object = feed.object;
      _result.meta = feed.meta;
      _result.created_at = feed.created_at;
    }
    return callback(JSON.stringify(_result));
  });
};
