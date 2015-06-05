var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AlertMap = mongoose.model('AlertMap');

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
  feed_id:  [Schema.Types.ObjectId],
  meta: Schema.Types.Mixed,
  of: {
   name: String,
   id: Number
  }
  is_read: {
   type: Boolean,
   default: false,
  },
  foreign_id: String,
  created_at: { type: Date, default: Date.now },
});

NotificationSchema.statics.sendFromFeed = function(feed) {
 var self = this;
 AlertMap.findGetUids({
  object: {
   id: feed.position.id,
   name: feed.position.name
  }
 }, function(users) {
  for(var i = 0; i <= users.length; i++) {
   self.insertOrUpdate({
    verb: "create",
    to_id: users[i],
    feed_id: feed._id,
    meta: [],
    actors: [feed.created_by]
   });
  }
 });
}

/**
 * Insert or update notification
 * 
 * @param Object data {feed_id, verb, actor, to_id}
 */
NotificationSchema.statics.insertOrUpdate = function(data) {
 var self = this;
 this.findOne({foreign_id: data.foreign_id}, function(err, doct) {
  if(!doct ) {
   
   // khởi tạo thông báo mới
   self.insert({
    to_id: data.to_id,
    actors: [data.actor],
    verb: data.verb,
    of: doct.of,
    feed_id: [data.feed_id],
    meta: data.meta,
    foreign_id: data.foreign_id
   });
   
  } else {
   
   // Thêm danh sách người mới hoạt động
   doct.actors.$push(data.actor);
   doct.created_at = Date.now;
   doct.meta = data.meta;
   doct.save(function(err) {
    // log error
   });
  }
 });
}

mongoose.model('Notification', NotificationSchema);
