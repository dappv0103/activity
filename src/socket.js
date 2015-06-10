var Command = require('./commands');

module.exports = Socket;

function Socket(socket) {
  this.socket = socket;
  
  this.socket.on('data', this.onData.bind(this));
  this.socket.on('end', this.onEnd.bind(this))
}

/**
 * On data event
 */
Socket.prototype.onData = function(data) {
  data = JSON.parse(data);
  var commandId = data.id;
  var args = data.arguments;
  Command.run(commandId, args, this.response.bind(this));
}
