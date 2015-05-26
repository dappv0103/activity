var Feed = require('../models/feed');
var User = require('../models/user');
var Notification = require('../models/notification');
var baseCmd = require('./baseCmd');

module.exports = addCmd;


function addCmd() {
  this.data = null;
  this.error = null;
};

addCmd.prototype = baseCmd;

addCmd.prototype.run = function (data, callback) {

  // newsfeed 
  User.find({
    'following': data.actor.user_id,
  }, function(err, users) {
    Feed.add(users, data);
  });
  
  // notification
  User.find({
    'notify': data.actor.user_id,
  }, function(err, users) {
    Notification.add(users, data);
  });
  
  this.data = {
    result: 'ok'
  };
  callback(this.getString());
};
