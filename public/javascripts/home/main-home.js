define(function(require) {
	//require('less');
	require('bootstrap-js');
	require('../contactform');
	require('../header');
	var language = require('../language');
	var animate = require('./animate');

	language.beginSwitch('home');
	animate.animatefuncs();

});

