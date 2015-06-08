var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedHome = mongoose.model('FeedHome');
var Notification = mongoose.model('Notification');




/**
 * @var string _id
 * @var object object
 * @var integer created_by
 * @var string position
 * @var object meta
 * @var integer ranking
 * @var Date created_at
 * @var Date updated_at
 * @var integer privacy
 */
 
 


var Feed = new Schema({
 
  created_by: Number,
  
  object:  {
   id: Number
   name: String,
   meta: Schema.Types.Mixed
  },
  
  position:  {
   name: String,
   id: Number,
   meta: Schema.Types.Mixed
  },
  
  created_at: { 
   type: Date, 
   default: Date.now 
  },
  
  updated_at: { 
   type: Date,
   default: Date.now 
  },
  
  meta: Schema.Types.Mixed,
  
  ranking: Number,
  privacy: Number,
});

// private feed
Feed.prototype.P_PRIVATE;

// public feed
Feed.prototype.P_PUBLISH;

Feed.prototype.POSITION_USER = 'user';
Feed.prototype.POSITION_GROUP = 'group';

mongoose.model('Feed', Feed);
