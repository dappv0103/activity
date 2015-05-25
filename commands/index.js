var _commands = [
  'add': require('./addCmd'),
  'remove': require('/removeCmd'),
  'find' : require('./findCmd'),
  'cout' : require('./coutCmd'),
];

export.find(name) {
  if(_commands[name]) {
    return _commands[name];
  }
  return false;
};
