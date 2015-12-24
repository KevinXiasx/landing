define(function(require) {
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
		$('a.portfolio-link').on("click", function () {
			$('.portfolio-modal .carousel-inner .item').remove();
			var attrindex = $(this).attr('index');
			var regres = attrindex.match(/a\d-(\d)-(\d)/);
			var count = parseInt(regres[1]);
			var index = parseInt(regres[2]);
			console.log(attrindex, regres, count, index);
			for (var i = 0; i < count; i++) {
				var choose = attrindex.replace(/\d$/, i.toString());
				console.log(choose);
				var src = $('[index="'+choose+'"] img').attr('src').replace(/-min/, '');
				var active = i==index?'active':'';
				$('.portfolio-modal .carousel-inner').append('<div class="item '+active+'"><img src="'+src+'" data-dismiss="modal" class="img-responsive img-thumbnail" alt="Responsive image" style="display: inline-block;background-color:white;"></div>');
			};
		});

		$('.videos figure').on('click', function () {
			$('#portfolioModal2 video').attr('src', $('.videos video').attr('src'));
		})

	})
});

