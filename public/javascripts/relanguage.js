define(function(require, exports, module) {

	function langbtn (text, ele) {
		this.txt = text;
		this.selfele = ele;
	}

	langbtn.prototype.Storage = function(lang) {
		if(lang)
			sessionStorage.setItem('language', lang);
		else
			return sessionStorage.getItem('language');
	};

	langbtn.prototype.loadheader = function() {
		$.ajax({
			'url':'/gettext',
			'type' : 'get',
			'data' : {"language": , "page": "header"},
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
	};

}