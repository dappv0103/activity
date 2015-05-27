var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
    
module.exports  = Mongo;


function Mongo(url) {
  if (!(this instanceof Mongo)) return new Mongo();
  this.db = null;
  this.connect(url);
};

Mongo.prototype.connect = function(url) {
  this.db = MongoClient.connect(url);
};

Mongo.prototype.getDb = function() {
    return this.db;
};

Mongo.prototype.getCollection = function(name) {
    return this.getDb().connection(name);
};
