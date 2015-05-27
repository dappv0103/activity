var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    BSON = require('mongodb').pure().BSON,
    assert = require('assert');
    
module.exports  = Mongo;


function Mongo() {
  if (!(this instanceof Mongo)) return new Mongo();
  this.url = url;
  this.mongoClient = mongodb.MongoClient;
};

Mongo.prototype.connect = function(callback) {
  this.mongoClient.connect(this.url, function(err, db) {
    assert.equal(null, err);
    callback(db);
  });
};

Mongo.prototype.insert;
