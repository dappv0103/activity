var Channel = require('../models/channel');
var baseCmd = require('./baseCmd');

module.exports = removeCmd;


function removeCmd() {
  if (!(this instanceof removeCmd)) return new removeCmd();
};

removeCmd.prototype = baseCmd;

removeCmd.prototype.run  = function(data, callback) {
  Channel.remove(data);
  this.setData({
    result: 'ok'
  })
  
  this.data = {
    result:'ok'
  };
  callback(this.getString());
};

