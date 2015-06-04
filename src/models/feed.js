var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedUser = mongoose.model('FeedUser');
var FeedGroup = mongoose.model('FeedGroup');
var FeedHome = mongoose.model('FeedHome');
var FeedActivity = mongoose.model('FeedActivity');
var Notification = mongoose.model('Notification');
var FollowMap = mongoose.model('FollowMap');
var AlertMap = mongoose.model('AlertMap');



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

// private feed
feedSchema.prototype.P_PRIVATE;

// public feed
feedSchema.prototype.P_PUBLISH;

feedSchema.prototype.POSITION_USER = 'user';
feedSchema.prototype.POSITION_GROUP = 'group';

// Khởi tạo các đối tượng newsfeed liên quan
feedSchema.methods.createNewsfeedPosition = function() {
    
  var self = this;
  if(this.position.name === this.POSITION_USER) {
    
    // Tạo bài viết  trên trang chủ user
    FeedUser.createFromFeed(this);
    
    // Gửi bài viết đến những người đang theo dõi
    if(this.privacy === this.P_PUBLISH) {
     feedHome.createFromFeed(this);
    }
  } else if(this.position.name === this.POSITION_GROUP) {
    
    // Tạo bài viết trong trang chủ hội nhóm
    FeedGroup.createFromFeed(this);
    
    // Tạo bài viết trong trang chủ người dùng
    feedHome.createFromFeed(this);
    
    // Gửi thông báo đến người đăng ký nhận thông báo nhóm
    Notification.sendFromFeed(this);
    
  }
}


/**
 * Xóa bảng tin
 */ 
feedSchema.statics.removeFeed = function(object) {
  this.findOneAndRemove({object:object}, function(err, doct) {
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

/**
 * Xóa hoạt động
 */
feedSchema.statics.removeActivity = function(verb, actor, object) {
  FeedActivity.removeFeedActivty(verb, actor, object);
}

/**
 * Hoạt động trên bảng tin
 */
feedSchema.statics.activity = function(verb, data) {
 
  this.findOne({object: data.object}, function(err, doct) {
    var ranking = doct.ranking + data.ranking;
    // gửi bảng tin đến những người đang theo dõi
    
    FollowMap.findGetUids({
        object: {
            id: doct.position.id,
            type: doct.position.name
        }
    }, function(err, users) {
         
         // biến đổi danh sánh người dùng đang theo dõi
         for(var i = 0; i < users.length; i++) {
             
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

  });
}



// remove feed group
feedSchema.methods.removeFeedGroup = function() {
 return FeedGroup.remove({feed_id: this._id}); 
}

// remove feed user
feedSchema.methods.removeFeedUser = function() {
 return FeedUser.remove({feed_id: this._id}); 
}

// remove feed home
feedSchema.methods.removeFeedHome = function() {
 return FeedHome.remove({feed_id: this._id}); 
}

// remove activities
feedSchema.methods.removeActivities = function() {
 return FeedActivity.remove({feed_id: this._id}); 
}

// remove notification
feedSchema.methods.removeNotifications = function() {
 return Notification.remove({feed_id: this._id}); 
}

// find newsfeed
feedSchema.statics.findNewsfeed = function(user_id, page) {
 
}

// find notification
feedSchema.statics.findNotification = function(user_id, page) {
 
}

mongoose.model('Feed', feedSchema);
