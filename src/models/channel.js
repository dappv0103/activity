
/*
var channel =  Channel.channel(10);

channel.add({
	
	to_id: [{ 
			id: 10,
			is_notification: 11
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
}

// Channel
Channel.prototype.channel = function(name) {
	this.channel = name;
	return this;
}

/**
 * Add newsfeed or update
 */
Channel.prototype.add = function(activity) {
	var _results = [];
	var actor;
	var users = activity.to_id;
	delete activity.to_id;
	for(var i = 0; i < users.length; i++) {
		activity.to_id = users[i].id;
		activity.is_notification = users[i].is_notification;
		activity.hash = this._buildHash(activity);
		this.insertOrUpdate(activity);
	}
	
}


Channel.prototype.insertOrUpdate = function(activity) {
	Redis.get(activity.hash, function(err, reply) {
		if(reply) {
			reply.actors.push = activity.actor;
			Redis.set(activity.hash, activity);
		}
	});
}

/**
 * Hash Object
 * @param Object Activity
 * @return Hash
 */
Channel.prototype._buildHash = function(activity) {
	return activity.to_id +':'+ activity.object;
}

Channel.prototype.set = function(field, data) {
	this[field] = data;
	return this.update();
}

Channel.prototype.get = function(field) {
	return this.find(field);
}
