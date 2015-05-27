var Channel = require('./channel');
module.exports = Notification;


function Notification() {
  if (!(this instanceof Notification)) return new Notification();
};

Notification.prototype.channel = function(channel) {
  return Channel.channel(channel);
}



Notification.prototype.add = function(users, data) {
  var self = this;
  var new_data = data;
  for(var i =0; i < users.length; i++) {
    new_data.user_id = users[i];
    this.channel().add(Channel.NOTIFICATION, new_data);
  }
};

Notification.prototype.remove = function() {
  return this.channel().remove(Channel.NOTIFICATION);
};

Notification.prototype.find = function (callback) {
  return this.channel().find(Channel.NOTIFICATION, callback);
};
