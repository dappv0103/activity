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
  actor:  Number,
  verb:   Schema.Types.Mixed,
  feed_id: Schema.Types.ObjectId,
  created_time: { type: Date, default: Date.now },
});


feedActivity.methods.sendNotification = function() {
 Notification.createOrInsert({
  to_id: this.to_id,
  actor:this.actor,
  verb: this.verb,
  feed_id: this.feed_id,
 })
}

feedActivity.methods.sendNewsfeed = function() {
 FeedHome.createOrUpdate({
  to_id: this.to_id,
  actor:this.actor,
  verb: this.verb,
  feed_id: this.feed_id,
 })
}

mongoose.model('FeedActivity', feedActivity);
