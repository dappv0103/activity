var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Notification = mongoose.model('Notification');
var FeedHome = mongoose.model('FeedHome');

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
  ranking: Number,
  created_time: { type: Date, default: Date.now },
});


feedActivity.methods.sendNotification = function() {
 Notification.createOrUpdate({
  to_id: this.to_id,
  actor:this.actor,
  verb: this.verb,
  feed_id: this.feed_id,
 })
}

feedActivity.methods.sendNewsfeed = function() {
 FeedHome.createOrUpdate({
  to_id: this.to_id,
  feed_id: this.feed_id,
  ranking: this.ranking
 })
}

feedActivity.statics.removeFeedActivty = function(verb, actor, feed_id) {
 this.remove({verb: verb, actor: actor, feed_id: feed_id});
 
 // xóa thông báo liên quan
 Notification.update({
  feed_id: feed_id
  verb: verb,
 }, {
  actors: {
   $pull: actor
  }
 });
}

mongoose.model('FeedActivity', feedActivity);
