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
  feed_id:  {
   type: Schema.ObjectId,
   ref: 'Feed'
  },
  ranking:  Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

feedGroupSchema.statics.insertOrUpdate = function(data) {
 var self = this;
 this.findOne({feed_id: data.feed_id}, function(err, doct) {
  if(!doct) {
   // Thêm bảng tin vào hội nhóm
   self.insert({
    group_id: data.group_id,
    feed_id: data.feed_id,
    raning: data.ranking
   });
  } else {
   // Cập nhật lại điểm số cho bảng tin hiển thị trên hội nhóm
   doct.ranking = data.ranking;
   doct.save(function(err) {
    // Log error
   });
  }
 });
}

mongoose.model('FeedGroup', feedGroupSchema);
