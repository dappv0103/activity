var mongodb = require('mongodb');
var assert = require('assert');
module.exports  = Mongo;


function Mongo() {
  this.url = url;
  this.mongoClient = mongodb.MongoClient;
};

Mongo.prototype.connect = function(callback) {
  this.mongoClient.connect(this.url, function(err, db) {
    assert.equal(null, err);
    callback(db);
  });
};
