var net = require('net');
var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  socket.on('data', function(data) {
    
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8124, function() { //'listening' listener
  console.log('server bound');
});
