var Feed = require('../feed');
var Status = require('../status');
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
Add.prototype.exec = function (args, callback) {
  var validator = Feed.validator(args);
  if(validator.passes()) {
    return Feed.create(args, callback);
  }
  return callback(JSON.stringify({
    status: Status.VALIDATOR_FEILED;
  }));
};
