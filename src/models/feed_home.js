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
 
 


var feedHomeSchema = new Schema({
  to_id: Number,
  feed_id:  Schema.Types.ObjectId,
  ranking:  Number,
  created_at: { type: Date, default: Date.now }
});

feedHomeSchema.statics.createOrUpdate = function(data) {
 var self = this;
 this.find({object: data.object, to_id: data.to_id}, function(err, doct) {
   if(!doct) {
    
    // tạo tin mới
    self.insert({
      to_id: data.to_id,
      feed_id: data.feed_id,
      ranking: data.ranking,
    }, function(err, doct) {
     // log error
    });
   } else {
    
    // cập nhật tin mới
    doct.created_at = Date.now;
    doct.ranking = data.ranking;
    doct.save(function(err) {
     // Log error
    });
   }
 });
}

mongoose.model('FeedHome', feedHomeSchema);
