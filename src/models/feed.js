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
  
  object:  {
   type: String,
   id: Number
  },
  
  position:  {
   type: String,
   id: Number
  },
  created_at: { 
   type: Date, 
   default: Date.now 
  },
  updated_at: { 
   type: Date,
   default: Date.now 
  },
  meta: Schema.Types.Mixed,
  ranking: Number,
  privacy: Number,
});

feedSchema.prototype.P_PRIVATE;
feedSchema.prototype.P_PUBLISH;

// Khởi tạo các đối tượng newsfeed liên quan
feedSchema.methods.createNewsfeedPosition = function() {
  
  if(this.position.name === "user") {
    
    // Tạo bài viết  trên trang chủ user
    FeedUser.create({
      to_id: this.position.id,
      feed_id: this._id,
      privacy: this.privacy
    });
    
    // Gửi bài viết đến những người đang theo dõi
    if(this.privacy === this.P_PUBLISH) {
     var users = [1, 2, 3];
     this.createNewsfeedHome(users);
    }
  } else if(this.position.name === 'group') {
    
    // Tạo bài viết trong group
    FeedGroup.create({
      group_id: this.position.id,
      feed_id: this._id,
    });
    
    // Gửi bài viết đến trang chủ những người đang theo dõi nhóm
    var users = [1, 2, 3, 4];
    this.createNewsfeedHome(users);
  }
}

feedSchema.methods.createNewsfeedHome = function(users) {
  
  for(var i =0; i <= users.length; i++) {
    // Khởi tạo feed home đến các user theo dõi
    FeedHome.create({
      to_id: users[i],
      feed_id: this._id,
      ranking: this.ranking
    });
  }
}

feedSchema.methods.sendNotification = function(users) {
  
  for(var i =0; i <= users.length; i++) {
    // Khởi tạo feed home đến các user theo dõi
    Notification.create({
      to_id: users[i],
      verb: 'create',
      feed_id: this._id
    });
  }
}

mongoose.model('Feed', feedSchema);
