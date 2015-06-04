var _commands = [];

_commands['add_feed'] = require('./add_feed_cmd');
_commands['delete_feed'] = require('./delete_feed_cmd');
_commands['activity'] = require('./activity_cmd');
_commands['delete_activity'] = require('./delete_activity_cmd');
_commands['newsfeed'] = require('./newsfeed_cmd');
_commands['notification'] = require('./notification_cmd');

exports.find = function(name) {
  if(_commands[name]) {
    return _commands[name];
  }
  return false;
};
