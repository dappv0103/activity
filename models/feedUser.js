



function feedUser() {
  this.user_id = null;
};


feedUser.prototype.user = function(user_id) {
  this.user_id = user_id;
  return this;
};

feedUser.prototype.create = function() {
  var self = this;
  this.collection(function(collection) {
    collection.insert({
      user_id: user_id,
      items: []
    });
  });
};


