var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedUser = mongoose.model('FeedUser');
var FeedGroup = mongoose.model('FeedGroup');
var FeedHome = mongoose.model('FeedHome');
var FeedActivity = mongoose.model('FeedActivity');
var Notification = mongoose.model('Notification');




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
  
  _in:  {
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
   var condition = {feed_id: doct._id};
   if(doct.postion.name === this.POSITION_GROUP) {
    
    // xóa tin trong group
    FeedGroup.remove(condition); 
   } else if(doct.postion.name === this.POSITION_USER) {
    
    // xóa tin trong trang người dùng
    FeedUser.remove(condition); 
   }
   
   // xóa tin trong trang chủ người dùng
   FeedHome.remove(condition); 
   
   // xóa hoạt động liên quan đến tin
   FeedActivity.remove(condition); 
   
   // xóa thông báo liên quan đến  tin
   Notification.remove(condition); 
  });
}

/**
 * Xóa hoạt động
 */
feedSchema.statics.removeActivity = function(verb, actor, object) {
 this.findOne({object: object}, function(err, doct) {
  FeedActivity.removeFeedActivty(verb, actor, doct);
 });
  
}

/**
 * Hoạt động trên bảng tin
 */
feedSchema.statics.activity = function(verb, actor, data) {
 
  this.findOne({object: data.object}, function(err, doct) {
    FeedActivity.insertFromFeed(verb, actor, doct);
  });
}


mongoose.model('Feed', feedSchema);
