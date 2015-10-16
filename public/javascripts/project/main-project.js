define(function(require) {

	require('less');
	require('bootstrap-js');
	
	var language = require('../language');
	language.loadl("project");

	var $ = require('jquery');

	$('.marktext').children('h2').each(function () {
		$('.nav-pills.nav-stacked').append('<li><a href="#'+$(this).text() +'">'+$(this).text() +'</a></li>');
		$(this).attr('id', $(this).text());
	});
	
	$(document).ready(function () {
		$('.portfolio-link img').on("click", function () {
			$('#portfolioModal1 img').attr('src', $(this).attr('src'));
		})
	})
});

