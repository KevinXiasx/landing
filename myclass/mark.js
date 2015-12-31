var marked = require('marked');
var fs = require('fs');
var path = require('path');
var cheerio = require("cheerio");
var logger = require('log4js').getLogger('mark');


function MarkFile(filename){
	var regRes = /\.\d\.md$/i.exec(filename);
	if( regRes ){
		this.name = path.basename(filename, regRes[0]);
		this.position = parseInt(/\d/.exec(regRes)) || 10;
	}
	else{
		this.name = path.basename(filename, '.md');
		this.position = 10;
	}
	this.filename = filename;
	this.type = path.extname(filename);
}

MarkFile.prototype.parse = function( callback) {
	var self = this;
	fs.readFile(self.filename,  'utf8', function (err, data) {
		if(err){
			logger.error(err);
			self.imgs = [];
			callback(err);
		}
		else{
			var $ = cheerio.load( marked(data) );
			self.imgs = $('img');
			self.html = $.html();
			self.video = $('video');
			$('video').remove();
			$('img').remove();
			self.htmlNoImg = $.html();
			callback();
		}
	})
};

MarkFile.prototype.getHtml = function () {
	return  this.html;
}

MarkFile.prototype.getHtmlNoimg = function () {
	return this.htmlNoImg;
}

MarkFile.prototype.getVideoSrc = function () {
	var videoSrc = [];
	for (var i = 0; i < this.video.length; i++) {
		videoSrc.push(this.video.eq(i).attr('src'));
	};
	return videoSrc;
}

MarkFile.prototype.getImgSrc = function(size) {
	var imgSrc = [];
	for (var i = 0; i < (size || this.imgs.length); i++) {
		imgSrc.push(this.imgs.eq(i).attr('src'));
	};
	return imgSrc;
};

MarkFile.prototype.getImgMinTag = function(size) {
	var imgTag = [];
	for (var i = 0; i < (size || this.imgs.length); i++) {
		imgTag.push('<img src="'+this.imgs.eq(i).attr('src')+'-min'+'"/>');
	};
	return imgTag;
};


/*	用于构造一个文件夹类
   	foldername : 文件夹的路径
*/
function MarkFolder (foldername) {
	this.foldername = foldername;
	this.lang = foldername.substr(foldername.lastIndexOf('-')+1);
	this.mkfiles = [];
	this.files = undefined;
}

MarkFolder.prototype.lang = function() {
	return this.lang;
}


/*	浅parse，只读取文件夹内文件的名字， 暂时不读取内容

   	cb : 回调函数，参数只有一个err
*/
MarkFolder.prototype.simpleParse = function(cb) {
	var Self = this;
	Self.files = [];
	fs.readdir(Self.foldername, function (err, files) {
		if(err){
			logger.error(err);
			cb(err);
		}else{
			for (var i = 0; i < files.length; i++){
				if(/\.d?md$/i.exec(files[i]))
					Self.files.push(files[i]);
			}
			cb();
		}
	})
};


/*	深度parse，读取文件夹内文件的名字，且读取内容，若调用时，未进行浅parse，则先调用simpleParse

   	cb : 回调函数，参数只有一个err
*/
MarkFolder.prototype.deepParse = function(cb) {
	var Self = this;
	var _deepParse_ = function () {
		Self.mkfiles = [];
		var guard = Self.files.length;
		if(!guard)
			cb();
		var _getPackFunc_ = function () {
			var _tmpmk_ = {};
			return function (name) {
				_tmpmk_ = new MarkFile(name);
				_tmpmk_.parse(function(err){
					if(!err)
						Self.mkfiles.push(_tmpmk_);
					guard--;
					if(!guard)
						cb();
				});
			}
		}
		for (var i = 0; i < Self.files.length; i++) {
			_getPackFunc_()(path.join(Self.foldername, Self.files[i]));
		};
	}

	if( typeof Self.files == 'undefined' ){
		Self.simpleParse(function (err) {
			if(err)
				cb(err);
			else
				_deepParse_();
		});
	}
	else
		_deepParse_();
};

//返回banner的MarkFile实例数组
MarkFolder.prototype.getDmd = function () {
	for (var i = 0; i < this.mkfiles.length; i++) {
		if (this.mkfiles[i].type === '.dmd')
		 	return this.mkfiles[i];
	};
}

//返回非banner的MarkFile实例
MarkFolder.prototype.getMdArray= function () {
	var result = [];
	for (var i = 0; i < this.mkfiles.length; i++) {
		if (this.mkfiles[i].type != '.dmd')
		 	result.push(this.mkfiles[i]);
	};
	result.sort(function (a, b) {
		return a.position > b.position;
	})
	return result;
}


/*向外暴露的唯一接口， 用于确认foldername文件夹内，是否含有lang语言包。！！该语言包必须命名为markdown-前缀的文件夹
	lang:语言种类
   	foldername : 查询文件夹的名字
	cb:回调函数，参数为(found , data)， found用于确认是否找到,若找到，通过data返回一个已经初始化好的MarkFolder实例
		若没有找到！！则通过data返回一个可代替的另一个语言包，由调用者决定是否使用
*/
var hasLang = function(lang, foldername, cb) {
	var found = false;
	fs.readdir(foldername, function (err, files) {
		if(err || files.length === 0){
			logger.error(err, found);
			cb(found);
		}else{
			var langs = [];
			var obj = {};
			for (var i = 0; i < files.length; i++){
				if( files[i].indexOf('markdown-') != -1){
					var extLang = files[i].substr('markdown'.length+1);
					langs.push(extLang);
					if( extLang == lang )
						found = true;
				}
			}
			var retlang;
			if(found)
				retlang = lang;
			else
				retlang = (langs[0] == lang)?langs[1]:langs[0];
			obj = new MarkFolder(path.join(foldername, 'markdown-'+retlang));
			obj.deepParse(function (err) {
				if(err)
					cb(false);
				else
					cb(found, obj);
			});
			return ;
		}
	})
};

module.exports = hasLang;