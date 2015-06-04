var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * @var string _id
 * @var integer user_id
 * @var object object
 */
 
 


var AlertMap = new Schema({
  user_id: Number,
  object:  {
    type: String,
    id: Number
  },
});

AlertMap.statics.findGetUids = function(condition, callback) {
  var _users = [];
  this.find(condition, function(err, users) {
    console.log('Error' + err);
    for(var i = 0; i < users.length; i++) {
      _users.push(users[i].user_id);
    }
    return callback(_users);
  })
}

mongoose.model('AlertMap', AlertMap);
