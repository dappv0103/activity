var redis = require("redis");


module.exports = Redis;


function Redis() {
  this.client = redis.createClient();
};


