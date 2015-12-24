define(function(require) {
	require('bootstrap-js');
	require('wow');
	require('../contactform');
	require('../header');
	
	var language = require('../language');
	language.beginSwitch("design");
	new WOW().init();
});

