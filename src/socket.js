var Command = require('./commands');

module.exports = Socket;

function Socket(socket) {
  this.socket = socket;
  
  this.socket.on('data', this.onData.bind(this));
  this.socket.on('end', this.onEnd.bind(this))
}

/**
 * On data event
 * 
 * @param buffer data
 */
Socket.prototype.onData = function(data) {
  data = JSON.parse(data);
  var commandId = data.id;
  var args = data.arguments;
  Command.run(commandId, args, this.response.bind(this));
}

/**
 * On client disconnect to the server
 */
Socket.prototype.onEnd = function() {
  console.log('Client disconnect');
}

/**
 * Returns buffer to the client
 * 
 * @param string buffer
 */
Socket.prototype.write = function(buffer) {
  this.socket.write(buffer);
}

/**
 * Returns data to the client
 */
Socket.prototype.response = function(buffer) {
  this.write(buffer);
}

