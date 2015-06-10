var Feed = require('../feed');

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
  Feed.create(args, callback);
};
