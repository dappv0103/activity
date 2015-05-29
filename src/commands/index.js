var _commands = [];

_commands['add'] = require('./addCmd');
_commands['remove'] = require('./removeCmd');
_commands['find'] = require('./findCmd');


exports.find = function(name) {
  if(_commands[name]) {
    return _commands[name];
  }
  return false;
};
