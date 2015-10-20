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
				},
			'error' : function () {
					alert('loading fail, network disconnect');
				}
		});			
	}

	function loadlangpage (lang, page) {
		loadlang(lang, 'header');
		if( page == 'home')
			loadlang(lang, page);
		setfontfamily(lang);
		console.log(lang);
		var langtag = (lang == "中文" ||lang == "")?"ch":(lang == "English"?"en":"");

		$('.en-ch').each(function(){
			var str = $(this).attr('href');
			var len = str.indexOf('-');
			len = len==-1?str.length:len;
			$(this).attr('href', str.substr(0,len) + '-' +langtag);
		})
	}


	exports.loadl =  function ( page) {
		
		var lang = sessionStorage.getItem('language') === null?"中文":sessionStorage.getItem('language');
		console.log(lang);
		$(document).ready(function(){
			loadlangpage(lang, page);

			if( page == "home"){
				$('.changelanguage').on('click', function () {
					loadlangpage($(this).text(), page);
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
		})
	}

	function setfontfamily (lang) {
		if( lang ==  'English'){
			$('.maintitle span').css('font-family', 'Montserrat,"Helvetica Neue",Helvetica,Arial,sans-serif');
			$('h1').css('font-family', 'Roboto-Regular');
			$('h2').css('font-family', 'Candara');
			$('h3').css('font-family', 'Roboto-Condensed');
		}
		else if( lang == '中文'){
			$('.maintitle span').css('font-family', 'AdobeHeitiStd-Regular');
			$('h1').css('font-family', 'msjhbd');
			$('h2').css('font-family', 'msjh');
			$('h3').css('font-family', 'simhei');
		}
	}
});

