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
  actors: Array,
  verb:  Schema.Types.Mixed,
  feed_id:  Schema.Types.ObjectId,
  is_read: {
   type: Boolean,
   default: false,
  },
  created_at: { type: Date, default: Date.now },
});

NotificationSchema.insertOrUpdate = function(data) {
 var self = this;
 this.findOne({feed_id: data.feed_id, verb: data.verb}, function(err, doct) {
  if(!doct ) {
   self.insert({
    to_id: data.to_id,
    actors: [data.actor],
    verb: data.verb,
    feed_id: data.feed_id,
   });
  } else {
   doct.actors.push(data.actor);
   doct.created_at = Date.now;
   doct.save(function(err) {
    // log error
   });
  }
 });
}

mongoose.model('Notification', NotificationSchema);
