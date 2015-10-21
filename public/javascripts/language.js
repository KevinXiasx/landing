define(function(require, exports, module) {

	var $ = require('jquery');


	function loadlang(lang, page) {
		$.ajax({
			'url':'/gettext',
			'type' : 'get',
			'data' : {"language": lang, "page": page},
			'success' : function (data) {
					sessionStorage.setItem('language', lang);
					$('[txt]').each(function () {
						$(this).text(data[$(this).attr('txt')]);
					})
					var time2 = new Date().getTime();
					console.log('time2 ='+ time2);
				},
			'error' : function () {
					alert('loading fail, network disconnect');
				}
		});			
	}

	function loadlangpage (lang, page) {
		loadlang(lang, 'header');
		if( page == 'home'){
			loadlang(lang, page);
			var time1 = new Date().getTime();
			console.log('time1 ='+ time1);
		}
		var langtag = (lang == "中文" ||lang == "")?"ch":(lang == "English"?"en":"");

		$('.en-ch').each(function(){
			var str = $(this).attr('href');
			var len = str.indexOf('-');
			len = len==-1?str.length:len;
			$(this).attr('href', str.substr(0,len) + '-' +langtag);
		})
	}


	exports.loadl =  function ( page) {
		
/*		var time1 = new Date().getTime();
		console.log('time1 ='+ time1);*/
		var lang = sessionStorage.getItem('language') === null?"中文":sessionStorage.getItem('language');
		$(document).ready(function(){
			loadlangpage(lang, page);

			if( page == "home"){
				$('.changelanguage').on('click', function () {
					loadlangpage($(this).text(), page);
					setfontfamily($(this).text());
				});
			}
			else if( page == "more"){
				$('.changelanguage').on('click', function () {

					var lang = $(this).text();
					sessionStorage.setItem('language', lang);

					var hre = location.href;
					var len = hre.lastIndexOf('-');
					var tmphref = hre.substr(0, len);
					if( lang == '中文'){
						tmphref += '-ch';
					}
					else if( lang == 'English' ){
						tmphref += '-en';
					}
					location.href = tmphref;
				});
			}
			else if( page == "project"){
				setfontfamily(lang);
			}
		})
/*		var time2 = new Date().getTime();
		console.log('time2 ='+ time2);*/
	}

	function setfontfamily (lang) {
		if( lang ==  'English'){
			$('.maintitle span').css('font-family', 'LithosPro-Black');
			$('h1').css('font-family', 'Roboto-Regular');
			$('h2').css('font-family', 'Candara');
			$('h3').css('font-family', 'Roboto-Condensed');
		}
		else if( lang == '中文'){
			$('.maintitle span').css('font-family', 'msjh');
			$('h1').css('font-family', 'msjh');
			$('h2').css('font-family', 'msjh');
			$('h3').css('font-family', 'msjh');
		}
/*		var time3 = new Date().getTime();
		console.log('time3 ='+ time3);*/
	}

});

