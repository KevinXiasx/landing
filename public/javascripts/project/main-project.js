define(function(require) {
	require('bootstrap-js');
	require('../header');
	var language = require('../language');
	language.beginSwitch("project");
	var $ = require('jquery'); 

	$('.marktext h2').each(function () {
		$('.nav-pills.nav-stacked').append('<li><a class="page-scroll" href="#'+$(this).parent().attr('id') +'">'+$(this).text() +'</a></li>');
	});
	
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        console.log('here');
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top-50
        }, 700);
        event.preventDefault();
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

