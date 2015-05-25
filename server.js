var net = require('net');
var command = require('./commands');
var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  socket.on('data', function(data) {
    data = JSON.parse(data);
    var result = Command.find(data.name, data).getString();
    socket.send(result);
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8001, function() { //'listening' listener
  console.log('server bound'+8001);
});
