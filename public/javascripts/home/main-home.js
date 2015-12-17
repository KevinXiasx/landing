define(function(require) {
 ////require('less'); //less-css
	require('bootstrap-js');
	require('../contactform');
	require('../header');
	var language = require('../language');
	var animate = require('./animate');

	language.beginSwitch('home');
	animate.animatefuncs();
});

