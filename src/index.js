var net = require('net'),
    Command = require('./commands');
    mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/feed'),
    Socket = require('./socket');


module.exports = Server;

/**
 * Server parameters
 * 
 * @param mixed parameters
 */
function Server(parameters) {
 this.server = net.createServer(this.onconnection.bind(this));
}

/**
 * On connection for the server
 */
Server.prototype.onconnection = function(socket) {
 return new Socket(socket);
}

/**
 * Listen the port to server
 */
Server.prototype.listen = function(port, callback) {
    this.server.listen(port, callback);
}
