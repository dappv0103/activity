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
 
 


var feedActivity = new Schema({
  to_id: Number,
  actor:  Number,
  verb:   Schema.Types.Mixed,,
  feed_id: Schema.Types.ObjectId,
  created_time: { type: Date, default: Date.now },
});


feedActivity.methods.sendNotification = function(users) {
 for(var i = 0; i <= users.length; i++) {
  Notification.createOrInsert({
   to_id: users[i],
   actors:this.actor,
   verb: this.verb,
   feed_id: this.id,
  })
 }
}

mongoose.model('FeedActivity', feedActivity);
