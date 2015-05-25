var net = require('net');
var command = require('./commands');
var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  // on data
  socket.on('data', function(data) {
    data = JSON.parse(data);
    var result = Command.find(data.name)
                        .run(data)
                        .getString();
    socket.write(result);
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8001, function() { //'listening' listener
  console.log('server bound'+8001);
});
