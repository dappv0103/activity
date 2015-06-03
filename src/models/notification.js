var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * @var string _id
 * @var integer created_by
 * @var object object
 * @var string position
 * @var object meta
 * @var integer ranking
 * @var Date created_at
 * @var Date updated_at
 * @var integer privacy
 */
 
 


var NotificationSchema = new Schema({
  to_id: Number,
  actor: Number,
  verb:  Schema.Types.Mixed,
  feed_id:  Schema.Types.ObjectId,
  is_read: Boolean,
  created_at: { type: Date, default: Date.now },
});

mongoose.model('Notification', NotificationSchema);
