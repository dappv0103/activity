var Server = require('./src');
var Parameters = [];


var server = new Server(Parameters);

// Listen to port
server.listen(6080, function() {
  console.log('connection to server port ' + 6080);
});
