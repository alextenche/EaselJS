'use strict';

var utils = require('./utils'),
 domReady = utils.domReady;

var c = createjs;

console.log('game started: EaselJS version:' + c.EaselJS.version);


domReady(function(){
	var stage = new c.Stage('main');

	var group = new c.Container();
	group.x = 300;
	group.y = 300;
	group.regX = 100;
	group.regY = 300;
	stage.addChild(group);

	group.on('tick', function (event){
		this.rotation -= 1;
	});

	var circle = new c.Shape();
	circle.graphics.beginFill('red').drawCircle(0, 0, 30);
	circle.x = 100;
	circle.y = 100;
	group.addChild(circle);

	var square = new c.Shape();
	square.graphics.beginFill('green').drawRect(0, 0, 50, 50);
	square.x = 300;
	square.y = 300;
	group.addChild(square);

	var introText = new c.Text('welcome to my EaselJS animation :)', '20px Arial', '#ff7700');
	introText.x = 250;
	introText.y = 250;
	introText.lineWidth = 100;
	stage.addChild(introText);
	//group.addChild(square);

	c.Ticker.timingMode = c.Ticker.RAF;
	c.Ticker.setFPS(60);
	c.Ticker.addEventListener('tick', function (event){
		stage.update();
	});
});