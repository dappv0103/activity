
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


function Channel() {
	this.channel = null;
	this.keyPrefix = "Channel:";
}

// Connect to channel
Channel.prototype.channel = function(name) {
	this.channel = name;
	return this;
}

/**
 * Add newsfeed or update
 * @param Object activity
 * @return boolean
 */
Channel.prototype.add = function(activity) {
	var users = activity.to_id;
	delete activity.to_id;
	var 
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

Channel.prototype.insertOrUpdateNotification = function(activity) {
	var self = this;
	var hash = 'notification:' + activity.hash;
	this.getCacheItem(hash, function(err, reply) {
		if(!reply) {
			reply = activity;
		} else {
			reply.actor.total += 1;
			reply.actor._new.push(activity.actor);
		}
		this.setCacheItem(hash, activity);
	});
}

Channel.prototype.setCacheItem = function(hash, value) {
	Redis.set(this.keyPrefix +':'+hash, value);
}

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

/**
 * Hash Object
 * @param Object Activity
 * @return Hash
 */
Channel.prototype.set = function(field, data) {
	this[field] = data;
	return this.update();
}

