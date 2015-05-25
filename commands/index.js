var _commands = [
  'add': require('./addCmd'),
  'remove': require('/removeCmd'),
  'find' : require('./findCmd')
];

var _settings = {};

export.find(name) {
  if(_commands[name]) {
    return _commands[name];
  }
  return false;
};
