
function Create(activity) {
  this.created_by = activity.actor;
  this.object = activity.object;
  this.meta = activity.meta;
  this.createFeed();
}

Create.prototype.createFeed = function() {
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
    // Log error
    feed.createNewsfeedPosition();
  });
}
