Command = require('./commands');

module.exports = Socket;

function Socket(socket) {
  this.socket = socket;
  
  this.socket.on('data', this.onData.bind(this));
  this.socket.on('end', this.onEnd.bind(this))
}
