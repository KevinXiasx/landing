define(function(require) {

 require('less'); //less-css
	require('bootstrap-js');
	require('../header');
	var language = require('../language');
	language.beginSwitch("project");
	var $ = require('jquery');

	$('.marktext').children('h2').each(function () {
		$('.nav-pills.nav-stacked').append('<li><a href="#'+$(this).text() +'">'+$(this).text() +'</a></li>');
		$(this).attr('id', $(this).text());
	});
	
	$(document).ready(function () {
		$('.portfolio-link img').on("click", function () {
			var src = $(this).attr('src');
			var len = src.lastIndexOf('-');
			var tmpsrc = src.substr(0, len);
			$('#portfolioModal1 img').attr('src', tmpsrc);
		})
	})
});

