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

mongoose.model('AlertMap', AlertMap);
