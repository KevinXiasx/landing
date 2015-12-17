
define(function(require, exports, module) {

 	var $ = require('jquery');
 	require('jq-transition');

 	/*用于执行动画的函数，动画对象应该要添加到shower类中，或者opacity属性初始为0

		obj:　需要动画效果的jq对象
		anima:　动画的效果，包括x,y,scale等ＣＳＳ属性
		time:　动画时间
 	*/
	var myshowfunc =  function (obj, anima, time) {
		obj.transition(anima, 0);
		obj.transition({scale: 1,y:0, x:0, opacity: 1, rotateY:0}, time.amtime);
	};

	exports.animatefuncs = function() {
		if( $(window).width() > 1200 ){　//如果窗口大小大于1200,才会触发动画
		 	$('#page-4').css('height', parseInt($(window).height()) - parseInt($('.bottomframe').css('height')) );//计算表格的高度

		//------------------------page-home show animage function--------------------
		//banner 的动画函数
		$(document).ready(function () {
			myshowfunc( $(".maintitle"), { scale:0.8 },{"amtime":1500});
			var siz = parseInt($('.cover span').css('font-size'));
			$(document).scroll(function () {
				var myhigh = $(document).scrollTop();
				if( myhigh < 1000 ){
					$('.cover').css("opacity", 0.8 - myhigh/200);
				}
			})
		});


		var pageshowlist = {};　//用于存储需要注册的事件动画

		var arrive = function (selector) {　//判断屏幕是否显示到该ＤＯＭ元素，（实际上，是显示200px）
			var currenHight = $(document).scrollTop()+$(window).height();
			var eleHight = parseInt($(selector).offset().top);
			return eleHight+200 < currenHight;
		}

		pageshowlist['page-1'] = function () {
			if( arrive('#page-1') ){
				var timerout = 0;				
				myshowfunc($('#page-1 .allcontent'), {scale:0.9, y:100}, {"amtime":1000});
				setTimeout(function(){myshowfunc($('#page-1 .allcontent .showner'), {scale:0.6, y:100}, {"amtime":1500})}, timerout+=400);
				$(document).off('scroll', pageshowlist['page-1']);
			}
		}

		pageshowlist['page-2'] = function () {
			if( arrive('#page-2') ){
				var timerout = 0;
				myshowfunc($('#page-2 .allcontent'), {scale:0.9, y:100}, {"amtime":1000});
				setTimeout(function(){myshowfunc($("#page-2 img.showner"), {x:300}, {"amtime":1500})},timerout+=500);
				$(document).off('scroll', pageshowlist['page-2']);
			}
		}

		pageshowlist['page-3'] = function () {
			if( arrive('#page-3') ){
				var timerout = 0;
				myshowfunc($('#page-3 .allcontent'), {scale:0.9, y:100}, {"amtime":1000});
				$(document).off('scroll', pageshowlist['page-3']);
			}
		}


		var stdhight = 0;
		var state = "white";
		var direc ;
		pageshowlist['page-4'] = function () {
	
			var selector = $('#page-4');
			var currenHight = $(document).scrollTop()+$(window).height();
			var eleHight = parseInt($(selector).offset().top);
			var heightself = parseInt($(selector).css('height'));
			if( currenHight > eleHight - 600 ){
				direc = $(document).scrollTop() - stdhight > 0?"down":"up";
				stdhight = $(document).scrollTop();

				if( direc == "down" && currenHight > eleHight+600 && state=="white"){　//处于向下滑动、当前高度在表格附近、背景颜色为白的时候，触发动画，背景变蓝
					selector.transition({'background-color':'#0199cb'});
					$('#page-4 .form').transition({'color':'#FFFFFF'});
					state = "blue";
				}
				if( direc == "up" && currenHight <= eleHight+600 && state=="blue"){　//处于向上滑动、当前高度在表格附近、背景颜色为蓝的时候，触发动画，背景变白
					selector.transition({'background-color':'#FFFFFF'});
					$('#page-4 .form').transition({'color':'#0199cb'});
					state = "white";
				}
			}
		}

		pageshowlist['page-5'] = function () {
			if( arrive('#page-5') ){
				var timerout = 0;
				$('#page-5 #text1 .title').transition({scale:2, y:100}, 0);
				myshowfunc($('#page-5 .allcontent'), {scale:0.9, y:100}, {"amtime":1000});
				setTimeout(function(){$('#page-5 #text1 .title').transition({scale:1, y:0}, 1000)},timerout+=1500);
				setTimeout(function(){myshowfunc( $("#page-5  #partner-1"),{y:100}, {"amtime":1500})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-5  #partner-2"),{y:100}, {"amtime":1500})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-5  #partner-3"),{y:100}, {"amtime":1500})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-5  #partner-4"),{y:100}, {"amtime":1500})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-5  #partner-5"),{y:100}, {"amtime":1500})},timerout+=250);
				$(document).off('scroll', pageshowlist['page-5']);
			}
		}

		pageshowlist['page-6'] = function () {
			if( arrive('#page-6') ){
				var timerout = 0;
				myshowfunc($('#page-6 .allcontent'), {scale:0.9, y:100}, {"amtime":1500});
				setTimeout(function(){myshowfunc( $("#page-6  #project-1"),{y:100}, {"amtime":1000})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-6  #project-2"),{y:100}, {"amtime":1000})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-6  #project-3"),{y:100}, {"amtime":1000})},timerout+=250);
				setTimeout(function(){myshowfunc( $("#page-6  #project-4"),{y:100}, {"amtime":1000})},timerout+=250);
				$(document).off('scroll', pageshowlist['page-6']);
			}
		}

		pageshowlist['page-7'] = function () {
			if( arrive('#page-7') ){
				var timerout = 0;
				myshowfunc($('#page-7 .allcontent'), {scale:0.9, y:100}, {"amtime":1000});
				$(document).off('scroll', pageshowlist['page-7']);
			}
		}

		$(document).ready(function () { //注册各个页面的动画函数，各个动画时间结束后，会自动移除事件监测，减小滑论滚动时的轮询压力
			for(var page in pageshowlist){
				$(document).on('scroll',pageshowlist[page]);	
			}
		})

		}
		else{//若是屏幕宽度小于1200，　则吧原来需要进行动画显示的元素设为可见
			$('.page .allcontent, .page .showner , .maintitle').css('opacity', 1);
		}
	}
});