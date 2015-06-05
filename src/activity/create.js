
function Create(activity) {
  this.created_by = activity.actor;
  this.object = activity.object;
  this.meta = activity.meta;
  this.createFeed();
}

Create.prototype.createFeed = function() {
  Feed.create({
    
  })
}
