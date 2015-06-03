var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedUser = mongoose.model('FeedUser');
var FeedGroup = mongoose.model('FeedGroup');
var FeedHome = mongoose.model('FeedHome');
var FeedActivity = mongoose.model('FeedActivity');

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
   name: String,
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
    
    // Tạo bài viết trong trang chủ hội nhóm
    FeedGroup.create({
      group_id: this.position.id,
      feed_id: this._id,
    });
    
    // Gửi bài viết đến trang chủ những người đang theo dõi nhóm
    var users = [1, 2, 3, 4];
    this.createNewsfeedHome(users);
    
    // Gửi thông báo đến người đăng ký nhận thông báo nhóm
    var users = [1, 2, 3, 4, 5];
    this.sendNotification(users);
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

feedSchema.statics.removeFeed = function(object) {
  this.findOne({object:object}, function(err, doct) {
   // xóa bảng tin
   doct.remove();
   if(doct.postion.name === 'group') {
    
    // xóa tin trong group
    doct.removeFeedGroup();
   } else if(doct.postion.name === 'user') {
    
    // xóa tin trong trang người dùng
    doct.removeFeedUser();
   }
   
   // xóa tin trong trang chủ người dùng
   doct.removeFeedHome();
   
   // xóa hoạt động liên quan đến tin
   doct.removeFeedActivities();
   
   // xóa thông báo liên quan đến  tin
   doct.removeNotifications();
  });
}

feedSchema.statics.removeActivity = function(verb, actor) {
  FeedActivity.removeFeedActivty(verb, actor);
}

feedSchema.statics.activity = function(verb, data) {
 
  this.findOne({object: data.object}, function(err, doct) {
    var ranking = doct.ranking + data.ranking;
    // gửi bảng tin đến những người đang theo dõi
    var users = [1, 2, 3];
    for(var i =0; i <= users.length; i++) {
     FeedActivity.insert({
      to_id: users[i],
      verb: verb,
      actor: data.actor,
      feed_id: doct._id,
      ranking: ranking
     }, function(err, doct2) {
      // cập nhật newsfeed đến những người theo dõi, nhận thông báo
      doct2.sendNewsfeed();
      doct2.sendNotification();
     });
    }
  });
}

feedSchema.methods.removeFeedGroup = function() {
 return FeedGroup.remove({feed_id: this._id}); 
}

feedSchema.methods.removeFeedUser = function() {
 return FeedUser.remove({feed_id: this._id}); 
}

feedSchema.methods.removeFeedHome = function() {
 return FeedHome.remove({feed_id: this._id}); 
}

feedSchema.methods.removeActivities = function() {
 return FeedActivity.remove({feed_id: this._id}); 
}

feedSchema.methods.removeNotifications = function() {
 return Notification.remove({feed_id: this._id}); 
}

mongoose.model('Feed', feedSchema);
