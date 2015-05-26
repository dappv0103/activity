var redis = require("redis");


module.exports = Redis;


function Redis() {
  if (!(this instanceof Redis)) return new Redis();
  this.client = redis.createClient();
};


