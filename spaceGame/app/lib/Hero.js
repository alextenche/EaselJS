'use strict';

var createSubClass = require('./utils/create_subclass'),
     actionService = require('./actions'),
         Container = createjs.Container;

var keyActions = {
	'moveleft': { property: 'heading', value: -1 },
	'moveright': { property: 'heading', value: 1 },
	'moveup': { property: 'thrust', value: -1 },
	'movedown': { property: 'thrust', value: 0.5 }
}

var   SPEED = 3,
  ROT_SPEED = 3.8,
    INERTIA = 0.88,
ROT_INERTIA = 0.8;


module.exports = createSubClass(Container, 'Hero', {
    initialize: Hero$initialize
});


function Hero$initialize(x, y) {
    Container.prototype.initialize.apply(this, arguments);
    this.x = x;
    this.y = y;

    _prepareProperties.call(this, x, y);
    _prepareBody.call(this);
    
    this.on('tick', onTick);
}


function _prepareBody(){
	this.body = new createjs.Shape();
    this.body.graphics.beginFill('blue').drawRect(-25, -25, 50, 50);
    this.addChild(this.body);
}

function _prepareProperties(x, y){
	this.name = 'hero';
	this.thrust = 0;
	this.heading = 0;
	this.rotation = 0;
	this.vRot = 0;
	this.vX = 0;
	this.vY = 0;
	this.x = x;
	this.y = y;
}

function _processActions(){
	var actions = actionService.get();
	this.thrust = 0;
	this.heading = 0;

	for(var key in actions){
		if(actions.hasOwnProperty(key)){
			var keyAction = keyActions[key];
			if(keyAction){
				this[keyAction.property] = keyAction.value;
			}
		}
	}

}


function onTick (event){
	this.rotation += this.vRot * ROT_SPEED;
	this.y += this.vY;
	this.x += this.vX;

	_processActions.call(this);

	this.vRot += this.heading;
	this.vRot = this.vRot * ROT_INERTIA;

	var ratioX = Math.sin((this.rotation) * Math.PI / -180) * this.thrust;
	var ratioY = Math.cos((this.rotation) * Math.PI / -180) * this.thrust;
	var diffX = ratioX * SPEED;
	var diffY = ratioY * SPEED;

	this.vX += diffX;
	this.vY += diffY;

	this.vX = this.vX * INERTIA;
	this.vY = this.vY * INERTIA;
}