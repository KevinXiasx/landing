define(function(require) {
	require('bootstrap-js');
	require('wow');
	require('../contactform');
	require('../header');
	$ = require('jquery');
	require('jq-transition');
	var language = require('../language');
	language.beginSwitch("design");
	new WOW().init();


	var stdhight = 0;
	var state = "white";
	var direc ;
	$(document).on('scroll', function () {

		var selector = $('#sec-3');
		var currenHight = $(document).scrollTop()+$(window).height();
		var eleHight = parseInt($(selector).offset().top);
		if( currenHight > eleHight - 600 ){
			direc = $(document).scrollTop() - stdhight > 0?"down":"up";
			stdhight = $(document).scrollTop();

			if( direc == "down" && currenHight > eleHight+600 && state=="white"){　//处于向下滑动、当前高度在表格附近、背景颜色为白的时候，触发动画，背景变蓝
				selector.transition({'background-color':'#0199cb'});
				$('#sec-3 .form , [txt="hello"]').transition({'color':'#FFFFFF'});
				state = "blue";
			}
			if( direc == "up" && currenHight <= eleHight+600 && state=="blue"){　//处于向上滑动、当前高度在表格附近、背景颜色为蓝的时候，触发动画，背景变白
				selector.transition({'background-color':'#FFFFFF'});
				$('#sec-3 .form, [txt="hello"]').transition({'color':'#0199cb'});
				state = "white";
			}
		}
	});
});

