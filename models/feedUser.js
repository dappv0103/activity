



function feedUser() {
  this.user_id = user_id;
};



feedUser.prototype.create = function(user_id) {
  this.collection(function(collection) {
    collection.insert({
      user_id: user_id,
      items: []
    });
  });
}


