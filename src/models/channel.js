var Redis = require('../models/redis');

/*
var channel =  Channel.channel(10);

channel.add({
	
	to_id: [{ 
			id: 10,
			is_viewer_notification: true,
			is_viewer_newsfeed: true
	}],

	verb: "like",
	
	actor: 10,
	
	object: 'content:10',
	
	ranking: 10,
});

channel.remove('notification', {
	verb:10,
	object: "content:10"
});

channel.get('notification');
*/

/**
 * Channel
 * 
 */
function Channel() {
	this.channel = null;
	this.keyPrefix = "Channel:";
}

/**
 * Connect channel
 */
Channel.prototype.open = function(name) {
	this.channel = name;
	return this;
}

/**
 * Add newsfeed or update
 * @param Object activity
 * @return boolean
 */
Channel.prototype.add = function(data) {
	var users = activity.to_id;
	delete activity.to_id;
	for(var i = 0; i < users.length; i++) {
		
		activity.to_id = users[i].id;
		activity.hash = this._buildHash(activity);
		
		// insert or update notification
		if(users[i].is_viewer_notification === true) {
			this.insertOrUpdate('notification', activity);
		}
		
		// insert or update newsfeed
		if(users[i].is_viewer_newsfeed === true) {
			this.insertOrUpdate('newsfeed', activity);
		}
		
	}
	
}

/**
 * Insert or update
 * @param Object activity
 * @return boolean
 */
Channel.prototype.insertOrUpdate = function(type, activity) {
	if(type === 'notification') {
		this.insertOrUpdateNotification(activity);
	} else {
		this.insertOrUpdateNewsfeed(activity);
	}
}


/**
 * Insert or update notification
 */
Channel.prototype.insertOrUpdateNotification = function(activity) {
	var self = this;
	var hash = 'notification:' + activity.hash;
	
	this.getCacheItem(hash, function(err, reply) {
		var actor = activity.actor;
		if(!reply) {
			self.setCacheItem(hash, activity);
		}
		
		self.channel(activity.to_id).addNotificationItem(hash);
	});
}

/**
 * Insert or update newsfeed
 */
Channel.prototype.insertOrUpdateNewsfeed = function(activity) {
	var self = this;
	var hash = 'newsfeed:' + activity.hash;
	this.getCacheItem(hash, function(err, reply) {
		self.
		self.channel(activity.to_id).addNewsfeedItem(hash);
	});
}

/**
 * Get Newsfeed
 */
Channel.prototype.getNewsFeed = function(callback) {
	return Redis.zrange('newsfeed_item:' + this.channel, function(err, reply) {
		callback(reply);
	});
}

/**
 * Get Notification
 */
Channel.prototype.getNotification = function(callback) {
	return Redis.zrange('notification_item:' + this.channel, function(err, reply) {
		callback(reply);
	});
}

/**
 * Add Newsfeed Item
 */
Channel.prototype.addNewsfeedItem = function(value, score) {
	return Redis.zset('newsfeed_item:' + this.channel, score, value);
}

/**
 * Add Notification Item
 */
Channel.prototype.addNotificationItem = function(value, score) {
	return Redis.zset('notification_item:' + this.channel, score, value);
}

/**
 * Remove notification item
 */
Channel.prototype.removeNotificationItem = function(value) {
	return Redis.zrem('notification_item:' + this.channel, value);
}

/**
 * Remove newsfeed item
 */
Channel.prototype.removeNewsfeedItem = function(value) {
	return Redis.zrem('newsfeed_item:' + this.channel, value);
}

/**
 * Set Cache Item
 * @param string hash
 * @param value
 * @return integer
 */
Channel.prototype.setCacheItem = function(hash, value) {
	return Redis.set(this.keyPrefix +':'+hash, value);
}

/**
 * Get cache template
 * @param string hash
 * @param function callback
 */
Channel.prototype.getCacheItem = function(hash, callback) {
	Redis.get(this.keyPrefix +':'+hash, callback);
}

/**
 * Hash Object
 * @param Object Activity
 * @return Hash
 */
Channel.prototype._buildHash = function(activity) {
	return activity.to_id +':'+ activity.object;
}

