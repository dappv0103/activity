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


function Mongo(url) {
  if (!(this instanceof Mongo)) return new Mongo();
  this.db = null;
  this.connect(url);
};

Mongo.prototype.connect = function(url) {
  this.db = this.MongoClient.connect(url);
};

Mongo.prototype.getDb = function() {
    return this.db;
};

Mongo.prototype.getCollection = function(name) {
    return this.getDb().connection(name);
};
