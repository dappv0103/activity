var _commands = [
  'add': require('./addCmd'),
  'remove': require('/removeCmd'),
  'find' : require('./findCmd'),
  'cout' : require('./coutCmd'),
];

export.find(name) {
  return _commands[name];
};
