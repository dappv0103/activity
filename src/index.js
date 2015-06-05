var net = require('net');
var command = require('./commands');
var mongo = require('./db/mongo')('mongodb://localhost:27017');
var redis = require('./db/redis')(6379 ,'localhost');


var server = net.createServer(function(socket) { //'connection' listener


  console.log('client connected');
  
  // on data
  socket.on('data', function(data) {
    data = JSON.parse(data);
    var cmd =  command.find(data.name);
    delete data.name;
    if(cmd != null) {
      if(data.is_next === true) { 
        process.nextTick(function() {
          cmd.run(data);
        });
        socket.write({'status:'1});
      }
    } else {
      socket.write({'status:'1});
    }
    
  });
  
  socket.on('end', function() {
    console.log('client disconnected');
  });
  
});
server.listen(8001, function() { //'listening' listener
  console.log('server bound'+8001);
});
