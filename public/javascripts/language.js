define(function(require, exports, module) {

	var $ = require('jquery');

	var ajaxDownText = function (lang, page, cb) { //用于下载该语言文本
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

	var ajaxGetLang = function (cb) { //用于在未本地标记语言的情况下，向服务器请求判定IP地址
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

	function SpanDoubleLang(page) { //这个类是在html中拥有txt属性的标签，会在切换中英文时，自动加载想对应文本
		this.page = page;
		this.renderPart = ['header','bottom'];
		if( page == 'home' || page == 'design' )
			this.renderPart.push(page);
	}

	SpanDoubleLang.prototype.render = function() {
		$('.collapse .dropdown-menu').children().remove();//先移除‘surpose’中的子标签
		console.log('remove over');
		for (var i = 0; i < this.renderPart.length; i++) {
			ajaxDownText( getLang(), this.renderPart[i], function (data) {
				
				for(var tag in data	){
					if(/link\w+/.test(tag)){ //假如是顶部的链接元素，则需要生成一个链接后再设置文本
						$('.collapse .dropdown-menu').append('<li><a txt="'+tag+'"></a></li>');
						console.log('add');
					}
					if( typeof data[tag] === 'object' ){
						for( var attrs in data[tag]){
							if(attrs === 'text')
								$('[txt="' +tag+'"]').text((data[tag])[attrs]);
							else
								$('[txt="' +tag+'"]').attr(attrs, (data[tag])[attrs]);
						}
					}	
					else
						$('[txt="' +tag+'"]').text(data[tag]);//否则直接设置文本
				}
				var langtxt = (getLang() =='en')?'中文':'English';
				$('[txt="language_2"').text(langtxt);
			});
		};
	};

	function LinkDoubleLang ( ) { //这个类是首页上，和顶部上的导航按钮，会在切换中英文时，自动切换链接目标的语言
		this.render = function() {
			$('.en-ch').each(function(){
				//将该类标签中的href替换为目前语言的链接， 正则表达式匹配将替换原href中‘-xx/’中的xx
				var hrefold = $(this).attr('href');
				var hrefnew = hrefold.replace(/(^\/[\w]+)-?[\w]{0,3}/, '$1-'+getLang());
				$(this).attr('href',hrefnew);
			});
		};
	}

	function BtnDoubleLang(page){ //顶部的切换中英文按钮
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