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
 * @param Object    data {verb, actor, object}
 * @param Function  callback
 */
addActivityCmd.prototype.run = function (data, callback) {
  
  var self = this;
  
  // Thêm hoạt động mới
  Feed.activity({
    // Người hoạt động
    actor:data.actor,
    
    // Hành động
    verb: data.verb,
    
    // Hành động trong
    object: {
      name: "group",
      id: 10
    },
    
    // Dữ liệu lưu trữ
    data: data.data,
  });
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
