var net = require('net'),
    command = require('./commands');
    mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/feed');


var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  // on data
  socket.on('data', function(data) {
    data = JSON.parse(data);
    var cmd =  command.find(data.name);
    delete data.name;
    if(cmd != null) {
      
      cmd.run(data, function(results) {
        socket.write(results);
      });
    } else {
      socket.write(JSON.stringify({
        success: false,
        message: 'Lệnh không đúng định dạng'
      }));
    }
    
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8001, function() { //'listening' listener
  console.log('server bound'+8001);
});
