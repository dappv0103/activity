var _commands = [];

_commands['ADD'] = require('./add');
_commands['DELETE'] = require('./delete');
_commands['ACTIVITY'] = require('./activity');
_commands['EDIT'] = require('./edit');

exports.find = function(name) {
  if(_commands[name]) {
    return _commands[name];
  }
  return false;
};
