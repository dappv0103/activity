var server = require('./src');
var Parameters = [];


var Server = server.create(Parameters);

// Listen to port
Server.listen(6080);
