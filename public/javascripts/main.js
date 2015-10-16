define(function(require) {

	require('less');
	require('bootstrap-js');
	
	var language = require('./language');
	var animate = require('./animate');

	animate.animatefuncs();
	language.loadl("home");
});

