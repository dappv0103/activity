var Mongo = require('../db/mongo');
module.exports = Notification;

function Notification() {
  this.mongo = Mongo.collenction('notification');
};

Notification.prototype.add = function(users, data) {
  
};

Notification.prototype.get = function (query, callback) {
  this.mongo.find({hash: query}, function(err, results) {
    return callback(err, results);
  });
};
