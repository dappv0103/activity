var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = addActivityCmd;


function addActivityCmd() {
  if (!(this instanceof addActivityCmd)) return new addActivityCmd();
  this.data = null;
  this.error = null;
};

addActivityCmd.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data
 * @param Function  callback
 */
addActivityCmd.prototype.run = function (data, callback) {
  
  var self = this;
  Feed.activity(data);
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};

