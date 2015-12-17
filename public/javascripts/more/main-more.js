define(function(require) {

 ////require('less'); //less-css
	require('bootstrap-js');
	require('../header');
	var language = require('../language');

	language.beginSwitch("more");

	var $ = require('jquery');
	$(document).ready(function () {
		$('.portfolio-link img').on("click", function () {
			$('#portfolioModal1 img').attr('src', $(this).attr('src'));
		});
	});

});

