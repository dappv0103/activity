var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedUser = mongoose.model('FeedUser');
var FeedGroup = mongoose.model('FeedGroup');
var FeedHome = mongoose.model('FeedHome');

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
 
 


var feedSchema = new Schema({
  created_by: Number,
  object:  Schema.Types.Mixed,
  position:  Schema.Types.Mixed,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  meta: Schema.Types.Mixed,
  ranking: Number,
  privacy: Boolean,
});

// Khởi tạo các đối tượng newsfeed liên quan
feedSchema.methods.createNewsfeedPosition = function() {
  
  if(this.position.name === "user") {
    
    // Tạo bài viết  trên trang chủ user
    FeedUser.create({
      to_id: this.position.id,
      feed_id: this._id,
      privacy: this.privacy
    });
  } else if(this.position.name === 'group') {
    
    // Tạo bài viết trong group
    FeedGroup.create({
      group_id: this.position.id,
      feed_id: this._id,
    });
  }
}

feedSchema.methods.createNewsfeedHome = function(users) {
  
  for(var i =0; i <= users.length; i++) {
    // Khởi tạo feed home đến các user theo dõi
    FeedHome.create({
      to_id: users[i],
      feed_id: this.privacy,
      ranking: this.ranking
    });
  }
}

mongoose.model('Feed', feedSchema);