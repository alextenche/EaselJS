'use strict';

var  domReady = require('./utils').domReady,
actionService = require('./actions'),
         Hero = require('./Hero');
  
var c = createjs,
    hero,
    stage;
    

console.log('game started: EaselJS version:' + c.EaselJS.version);

domReady(function init() {
	actionService.init(window);
    prepareWorld();
    c.Ticker.addEventListener('tick', function(){
    	stage.update();
    });
});



function prepareWorld() {
    stage = new c.Stage('main');
    hero = new Hero(100, 100);
    stage.addChild(hero);
}