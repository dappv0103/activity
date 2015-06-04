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
 
 


var feedUserSchema = new Schema({
  to_id: Number,
  feed_id:  Schema.Types.ObjectId,
  ranking:  Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  privacy: Number
});

feedUserSchema.statics.createFromFeed = function(feed) {
 
 // Insert news feed to user page
 return this.insert( {
   to_id: feed.position.id,
   feed_id: feed._id,
   privacy: feed.privacy
 })
}


feedUserSchema.statics.insertOrUpdate = function(data) {
 var self = this;
 this.findOne({feed_id: data.feed_id}, function(err, doct) {
  if(!doct) {
   
   // tạo bảng tin trên trang cá nhân
   self.insert({
    to_id: data.to_id,
    feed_id: data.feed_id,
    ranking: data.ranking,
    privacy: data.privacy,
   });
  } else {
   // Cập nhật lại điểm ranking
   doct.ranking = data.ranking;
   doct.save(function(err) {
    // Log error
   });
  }
 });
}

mongoose.model('FeedUser', feedUserSchema);
