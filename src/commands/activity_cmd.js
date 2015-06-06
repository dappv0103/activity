var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./base_cmd');

module.exports = ActivityCmd;


function ActivityCmd() {
  if (!(this instanceof ActivityCmd)) return new ActivityCmd();
  this.data = null;
  this.error = null;
};

ActivityCmd.prototype = baseCmd;

/**
 * Thêm bảng tin mới
 * 
 * @param Object    data {verb, actor, object}
 * @param Function  callback
 */
ActivityCmd.prototype.run = function (data, callback) {
  
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
    }
  });
  
  this.data = {
    result: 'ok'
  };
  return callback(this.getString());
};

