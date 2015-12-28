var express = require('express');
var fs = require('fs');
var router = express.Router();
var url = require("url");
var hasLang = require('../myclass/mark.js');
var email = require("../myclass/email.js");
var ipresolve = require("../myclass/resolve");
var logger = require('log4js').getLogger("index");
var Promise = require('promise');
var path = require('path');

router.get('/', function(req, res) {　//首页的路由

	var promise = new Promise(function(reslove, reject){
		ipresolve.isChina(req, function (result) {
			reslove(result?'zh':'en');
		});
	});
	var _resfunc_ = function (da) {
		var projs = [];
		var mdArray = da.getMdArray();
		for (var i = 0; i < mdArray.length; i++) {
			if(!mdArray[i].getImgSrc()[0])
				continue;
			projs.push({'imgs':mdArray[i].getImgSrc()[0]});
		};
		res.render("home/landing", {"projectname": projs,'page':'home'});		
	}

	promise.then(function(lang){
		hasLang(lang, 'views/project', function (found, data) {　//查找首页中的项目内容，渲染后发送
			if(!data)
				res.render("home/landing", {"projectname": null,'page':'home'});	
			else
				_resfunc_(data);
		});
	});
});
//设计服务页面路由
router.get('/designservice', function(req, res) {　
	res.render('design/design',{'page':'design'});
});

//项目页面正则路由，理论上，只要带有project-前缀的url，都可以访问该页面，如果后缀携带的语言非法，或者不存在，则随机返回一个可用的语言，如果任何语言都不存在（不应该出现此类情况），则返回null
//渲染的数据包括，　（markdown文件转化为html之后，在移除img标签的html代码），（访问压缩图片的img标签代码），（还有首页dmd文件的html代码）
router.get('/project-:lang', function(req, res) {　
	var _resfunc_ = function (da) {
		var dmk,
			mks=[];
		da.getMdArray().forEach(function(mkele){
			mks.push({'text' : mkele.getHtmlNoimg(), 'imgs_min' : mkele.getImgMinTag(), 'imgsrc':mkele.getImgSrc(), 'video':mkele.getVideoSrc()});
		});
		dmk = da.getDmd().getHtml();
		
		res.render('project/projectpage', {"marks": mks, "index": dmk, 'page':'project'});
	}
	hasLang(req.params.lang, 'views/project', function (found, data) {
		if(!data){
			res.send('not found');
			return ;
		}else
			_resfunc_(data);
	});
});

//产品页面的正则路由
//渲染需要的数据包括：（markdown文件转化为html之后，在移除img标签的html代码），（访问图片的url地址），（还有首页dmd文件的html代码）
router.get('/platform-:lang', function (req, res) {
	hasLang(req.params.lang, 'views/more', function (found, data) {
		if(!data){
			res.send('not found');
			return ;
		}
		var dmk,
			mks = [];
		var mdArray = data.getMdArray();
		for (var i = 0; i < mdArray.length; i++) {
			mks.push({'text' : mdArray[i].getHtmlNoimg(), 'img' : mdArray[i].getImgSrc()});
		};
		dmk = data.getDmd().getHtml();
		
		res.render('more/more', {"marks": mks, "index": dmk, 'page':'more'});
	});
})

//浏览器在没有sessionStorage数据表明语言种类的时候，会向服务器发出此请求。
router.get('/getarea', function (req, res) {
	ipresolve.isChina(req, function (result) {
		res.send(result?'zh':'en');
	});
})

//回应浏览器下载语言文本的ajax请求
//若是http请求中的字段不存在或文件转化为对象时错误，则catch(非法字段在上线时不应该出现，若出现，应该是恶意请求)
router.get('/gettext', function(req, res) {
	var paths = {"header":"views/header.txt", 
				"home":"views/home/home.txt", 
				"design":"views/design/design.txt",
				"bottom":"views/bottom.txt"};
	var params = url.parse(req.url, true).query;
	try{
		fs.readFile(paths[params.page], function(err, data) {
			if(err)
				res.send({});
			else{
				var txt = JSON.parse(data);
				var l = txt[params.language] || txt.zh || txt.en;
				if(params.page == 'home'){ //如果是首页的文本,需要额外加载项目的名字
					hasLang(params.language, 'views/project', function (found, data){
						if(!data){
							res.send(l);
							return ;
						}
						var mdArray = data.getMdArray();
						for (var i = 0; i < mdArray.length; i++)
							l['proj'+(i+1)] = mdArray[i].name;
						res.send(l);
					});
				}else
					res.send(l);
			}
		});
	} catch(e){
		logger.error('err , gettext http require, page :'+paths[params.page] + e);
		res.send({});
		return ;
	}
});

//表单数据提交的路由
//若是表单中的总字数超过1000（也许是恶意提交），则返回large
router.post('/contactform', function(req, res) {
	var reqlength = req.body.name.length + req.body.email.length +req.body.message.length;
	if( reqlength > 1000 ){
		res.send('large');
		return ;
	}
	var content = "Tom: \n    "+req.body.name+" send a message to you via radxa landing page.\n His email is '"+req.body.email +"', message is :\n    "+req.body.message+'\n';
	email.emailtom(content);
	res.send('succese');
});

module.exports = router;
