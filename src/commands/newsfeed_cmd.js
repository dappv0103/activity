var Channel = require('../models/channel');
var baseCmd = require('./baseCmd');

module.exports = Newsfeed;


function Newsfeed() {
  if (!(this instanceof Newsfeed)) return new Newsfeed();
  this.data = null;
  this.error = null;
};

Newsfeed.prototype = baseCmd;

Newsfeed.prototype.run = function (data, callback) {
  var self = this;
  
};

Newsfeed.prototype.callCmd = function(results, callback) {
  this.data = results;
  callback(this.getString());
};
