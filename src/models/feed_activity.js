var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/**
 * @var Number to_id
 * @var Array actors
 * @var Mixed verb
 * @var ObjectId feed_id
 * @var integer privacy
 */
 
 


var feedActivity = new Schema({
  to_id: Number,
  actors:  Array,
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
