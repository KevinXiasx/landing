define(function(require, exports, module) {

	var $ = require('jquery');

	var ajaxDownText = function (lang, page, cb) {
		$.ajax({
			'url':'/gettext',
			'type' : 'get',
			'data' : {"language": lang, "page": page},
			'success' : cb,
			'error' : function () {
					alert('loading fail, network disconnect');
				}
		});		
	};

	var ajaxGetLang = function (cb) {
		$.ajax({
			'url':'/getarea',
			'type' : 'get',
			'success' : cb,
			'error' : function () {
					alert('loading fail, network disconnect');
				}
		});
	};

	var getLang = function() {
		return sessionStorage.getItem('language');
	};

	function SpanDoubleLang(page) {
		this.page = page;
		this.renderPart = ['header','bottom'];
		if( page == 'home' || page == 'design' )
			this.renderPart.push(page);
	}

	SpanDoubleLang.prototype.render = function() {
		for (var i = 0; i < this.renderPart.length; i++) {
			ajaxDownText( getLang(), this.renderPart[i], function (data) {
				for(var tag in data	){
					$('[txt="' +tag+'"]').text(data[tag]);
				}
				var langtxt = (getLang() =='en')?'中文':'English';
				$('[txt="language_2"').text(langtxt);
			});
		};
	};

	function LinkDoubleLang ( ) {
		this.render = function() {
			$('.en-ch').each(function(){
				//将该类标签中的href替换为目前语言的链接， 正则表达式匹配将替换原href中‘-xx/’中的xx
				var hrefold = $(this).attr('href');
				var hrefnew = hrefold.replace(/(^\/[\w]+)-?[\w]{0,3}/, '$1-'+getLang());
				$(this).attr('href',hrefnew);
			});
		};
	}

	function BtnDoubleLang(page){
		this.page = page;
	}

	BtnDoubleLang.prototype.render = function(obj) {
		switch(this.page){
			case 'home': case 'design':
				$('.changelanguage').on('click', function () {
					obj.change(getLang() == 'zh' ?'en':'zh');
				});
				break;
			case 'more': case 'project':
				$('.changelanguage').on('click', function () {
					var switchToLang = (getLang() == 'zh')?'en':'zh';
					obj.setLang(switchToLang);
					var hre = location.href;
					location.href = hre.replace(/-[\w]+$/, '-'+switchToLang);
				});
				break;
			default:
				break;
		}
	};

	function LangRender (lang, page) {
		sessionStorage.setItem('language', lang);
		this.span = new SpanDoubleLang(page);
		this.link = new LinkDoubleLang();
		this.btn = new BtnDoubleLang(page);
	}

	LangRender.prototype.setLang = function(lang) {
		sessionStorage.setItem('language', lang);
	};

	LangRender.prototype.render = function() {
		this.span.render();
		this.link.render();
		this.btn.render(this);
	};

	LangRender.prototype.change = function(lang) {
		if ( getLang() == lang )
			return;
		this.setLang(lang);
		this.span.render();
		this.link.render();
	};

	exports.beginSwitch = function (page) {
		var pagelang = sessionStorage.getItem('language');
		if( !pagelang){
			ajaxGetLang(function(data){
				var langRender = new LangRender(data, page);
				langRender.render();
			})
		}else{
			var langRender = new LangRender(pagelang, page);
			langRender.render();
		}
	};
});