var _commands = [
  'add': require('./addActivity'),
  'remove': require('/removeActivity'),
  'find' : require('./find'),
  'cout' : require('./cout'),
];

export.find(name) {
  return _commands[name];
};
