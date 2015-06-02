var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * @var string _id
 * @var object object
 * @var integer created_by
 * @var string position
 * @var object meta
 * @var integer ranking
 * @var Date created_at
 * @var Date updated_at
 * @var integer privacy
 */
 
 


var feedGroupSchema = new Schema({
  group_id: Number,
  feed_id:  Schema.Types.ObjectId,
  ranking:  Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

mongoose.model('FeedGroup', feedGroupSchema);