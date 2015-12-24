define(function(require) {
	require('bootstrap-js');
	require('wow');
	require('../contactform');
	require('../header');
	var language = require('../language');
	var animate = require('./animate');

	language.beginSwitch('home');
	animate.animatefuncs();
	new WOW().init();
});

 