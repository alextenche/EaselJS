'use strict';

var EventDispatcher = createjs.EventDispatcher,
         EaselEvent = createjs.Event;

var controls = {
	37: 'moveleft',
	39: 'moveright',
	38: 'moveup',
	40: 'movedown',
	32: 'fire1'
};

var currentActions = {};
var stage;

var actionService = module.exports = {
	init: actions_init,
	get: actions_get
};

function actions_init(win, currentStage){
	stage = currentStage;
	win = win || window;
	EventDispatcher.initialize(actionService);

	win.addEventListener('keydown', onKeyDown);
	win.addEventListener('keyup', onKeyUp);
	win.addEventListener('mousemove', onMouseMove);
}


function actions_get(){
	return currentActions;
}

function onKeyDown(event){
	var keyEvent = processEvent(event, 'down');
	if(keyEvent){
		currentActions[keyEvent.type] = keyEvent.data;
	}
}

function onKeyUp(event){
	var keyEvent = processEvent(event, 'up');
	if(keyEvent){
		delete currentActions[keyEvent.type];
	}
}

function onMouseMove(){
	var canvasEl = stage && stage.canvas;
	if(!canvasEl) return;

	var canvasXPos = canvasEl.offsetLeft;
	var canvasYPos = canvasEl.offsetTop;

	currentActions.mouse = {
		winX: event.clientX,
		winX: event.clientX,
		stageX: event.clientX - canvasXPos,
		stageY: event.clientY - canvasYPos,
		target: event.target
	}
}

function processEvent(event, phase){
	var generalEvent = prepareEvent(event, phase, 'key');
	if(!generalEvent) return;
	var specificEvent = prepareEvent(event, phase);

	actionService.dispatchEvent(generalEvent);
	actionService.dispatchEvent(specificEvent);

	return specificEvent;
}

function prepareEvent (event, phase, type){
	var actionName = controls[event.keyCode];
	if(!actionName) return;

	type =  type || actionName;

	var eventData = {
		name: actionName,
		shiftKey: event.shiftKey,
		metaKey: event.metaKey,
		altKey: event.altKey,
		ctrlKey: event.ctrlKey,
		phase: phase
	};

	var keyEvent = new EaselEvent(type);
	keyEvent.data = eventData;
	keyEvent.nativeEvent = event;
	return keyEvent;
}