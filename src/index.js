var net = require('net'),
    Command = require('./commands');
    mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/feed');


var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  // on data
  socket.on('data', function(data) {
    data = JSON.parse(data);  
    var commandId = data.id;
    var args = data.arguments;
    
    Command.exec(commandId, args, function(buffer) {
        socket.write(buffer);
    });
    
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8001, function() { //'listening' listener
  console.log('server bound'+8001);
});
