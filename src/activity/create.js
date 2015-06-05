
function Create(activity) {
  this.created_by = activity.actor;
  this.object = activity.object;
  this.meta = activity.meta;
  this.createFeed();
}

Create.prototype.createFeed = function() {
  var self;
  // Tạo feed khi có hành động đăng đối tượng nào đấy
  var feed = new Feed({
    object: data.object,
    created_by: data.created_by,
    _in: data._in,
    meta: data.meta,
    ranking: data.ranking,
    privacy: data.privacy;
  });
  
  feed.save(function(err) {
    
    
    
    var followdata = {
      to_id: self.created_by,
      object: {
        name: 'Feed',
        id: feed._id,
      },
      score: 5
    };
    
    
    // Follow Feed
    FollowMap.insert(followdata);
    
    // Alert feed
    AlertMap.insert(followdata);
    
    // Log error
    feed.createNewsfeedPosition();
  });
}
