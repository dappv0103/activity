var net = require('net');
var command = require('./commands');
var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  // on data
  socket.on('data', function(data) {
    data = JSON.parse(data);
    var cmd =  Command.find(data.name);
    if(cmd != null) {
      cmd.run(data, function(result) {
        socket.write(result);
      });
    };
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8001, function() { //'listening' listener
  console.log('server bound'+8001);
});
