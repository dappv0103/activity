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


/**
 *  Gửi thông báo sau khi nhận được hành động người mình đang nhận
 */
feedActivity.methods.sendNotification = function() {
 Notification.createOrUpdate({
  to_id: this.to_id,
  actor:this.actor,
  verb: this.verb,
  feed_id: this.feed_id,
 })
}

/**
 *  Gửi bảng tin sau khi nhận được hành động người mình đang theo dõi
 */
feedActivity.methods.sendNewsfeed = function() {
 FeedHome.createOrUpdate({
  to_id: this.to_id,
  feed_id: this.feed_id,
  ranking: this.ranking
 })
}

feedActivity.statics.insertFromFeed = function(verb, actor, feed) {
 var self = this;
 FollowMap.findGetUids({object:{
  id: feed.position.id,
  name: feed.position.name
 }}, function(users) {
  for(var i = 0; i <= users.length; i++) {
   var activity = new feedActivity({
    to_id: users[i],
    actor: actor,
    verb: verb,
    feed_id: feed._id,
    ranking: feed.ranking
   });
   
   // Save activity
   activity.save(function(err) {
    activity.sendNewsfeed();
    activity.sendNotification();.
   });
  }
 })
}

/**
 *  Xóa các hoạt động liên quan
 */
feedActivity.statics.removeFeedActivty = function(verb, actor, feed) {
 this.remove({verb: verb, actor: actor, feed_id: feed._id});
 
 // xóa thông báo liên quan
 Notification.update({
  feed_id: feed._id
  verb: verb,
 }, {
  $pull: {
   actors: [actor]
  }
 });
}

mongoose.model('FeedActivity', feedActivity);
