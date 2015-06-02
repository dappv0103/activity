var mongoose = require('mongoose');
var Feed = mongoose.model('FeedActivity');
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

  FeedActivity.create({
    
  }, function(err, doct) {
    doct.send();
  });
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};

