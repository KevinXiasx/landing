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
	loadlang(lang, page);
	setfontfamily(lang);
}

function loadl ( page) {
	var lang = sessionStorage.getItem('language') == "null"?"中文":sessionStorage.getItem('language');
	$(document).ready(loadlangpage(lang, page));

	$('.changelanguage').on('click', function () {
		loadlangpage($(this).text(), page);
	});
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