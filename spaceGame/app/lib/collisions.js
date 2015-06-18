'use strict';

var EaselEvent = createjs.Event;

var actors = [];

module.exports = {
	addActor: addActor,
	removeActor: removeActor,
	broadcastCollisions: broadcastCollisions
};



function addActor (obj, type, options){
	var index = actors.indexOf(obj);

	if(index !== -1) 
		return console.log('collisions: object already registered for collisions', actors);

	obj._collisionInfo = {
		type: type,
		options: options
	}
	return actors.push(obj);	
}



function removeActor (obj){
	var index = actors.indexOf(obj);

	if(index === -1) 
		return console.log('collisions: object not registered for collisions', actors);

	delete obj._collisionInfo;
	return actors.splice(index, 1);
}



function broadcastCollisions(){
	var collisions = [];

	actors.forEach(function (self){
		actors.forEach(function (other) {
			var selfInfo = self._collisionInfo;
			var otherInfo = other._collisionInfo;

			if(self != other){
				if(selfInfo.type == 'circle' && otherInfo.type == 'circle'){
					var dist = selfInfo.options.radius + otherInfo.options.radius;
				} else if (selfInfo.type == 'point' && otherInfo.type == 'circle'){
					var dist = otherInfo.options.radius;
				} else if (selfInfo.type == 'circle' && otherInfo.type == 'point'){
					var dist = selfInfo.options.radius;
				}

				if(dist > distanceBetween(self, other)){

						var collisionsEvent = new EaselEvent('collision');
						collisionsEvent.data = {
							self: self,
							other: other
						};
						collisions.push({
							target: self,
							event: collisionsEvent
						});
				}
			}
		});
	});

	collisions.forEach(function (info) {
		info.target.dispatchEvent(info.event);
	});
}



function distanceBetween (obj1, obj2){
	return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));
}

