var mongoose = require('mongoose');
var Feed = mongoose.model('Feed');
var baseCmd = require('./baseCmd');

module.exports = addActivityCmd;


function addActivityCmd() {
  if (!(this instanceof addActivityCmd)) return new addActivityCmd();
  this.data = null;
  this.error = null;
};

addActivityCmd.prototype = baseCmd;


addActivityCmd.prototype.run = function (data, callback) {
  var self = this;

  Feed.act(data.verb, {
    actor: data.actor,
    object:data.object
  };
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};

