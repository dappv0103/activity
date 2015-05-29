var Channel = require('../models/channel');
var baseCmd = require('./baseCmd');

module.exports = addCmd;


function addCmd() {
  if (!(this instanceof addCmd)) return new addCmd();
  this.data = null;
  this.error = null;
};

addCmd.prototype = baseCmd;

addCmd.prototype.run = function (data, callback) {

  Channel.add(data);

  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
