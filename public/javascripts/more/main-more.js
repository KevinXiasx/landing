define(function(require) {

	require('less');
	require('bootstrap-js');
	
	var language = require('../language');

	language.loadl("more");

	var $ = require('jquery');
	$(document).ready(function () {
		$('.portfolio-link img').on("click", function () {
			$('#portfolioModal1 img').attr('src', $(this).attr('src'));
		})
	})
});
