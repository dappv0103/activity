var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var FollowMap = mongoose.model('FollowMap');

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
  feed_id: {
   type: Schema.ObjectId,
   ref: 'Feed'
  },
  ranking:  Number,
  created_at: { type: Date, default: Date.now }
});

feedHomeSchema.statics.createFromFeed = function(feed) {
  var self = this;
  FollowMap.findGetUids({object: {
     id: feed.position.id,
     type: feed.position.name
  }}, function(users) {
    for(var i =0; i <=users.length; i++) {
     self.insert({
      to_id: users[i],
      feed_id: feed._id,
      ranking: feed.ranking
     });
    }
  });
}

feedHomeSchema.statics.findAndRender = function(condition) {
 this.find(condition, function() {
  
 });
}

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
