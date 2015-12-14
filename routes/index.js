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

router.get('/', function(req, res) {
	var promise = new Promise(function (resolve, reject) {
		ipresolve.isChina(req, function (result) {
			resolve(result);
		});
	});

	var _resfunc_ = function (da) {
		var projs = [];
		var mdArray = da.getMdArray();
		for (var i = 0; i < mdArray.length; i++) {
			projs.push({'name': mdArray[i].name, 'imgs':mdArray[i].getImgSrc()[0]});
		};
		res.render("home/landing", {"projectname": projs,'page':'home'});		
	}
	promise.then(function (result) {
		hasLang(result?'zh':'en', 'views/project', function (found, data) {
			if(!data)
				res.render("home/landing", {"projectname": null,'page':'home'});	
			else
				_resfunc_(data);
		});
	});
});

router.get('/designservice', function(req, res) {
	res.render('design/design',{'page':'design'});
});

router.get('/project-:lang', function(req, res) {
	var _resfunc_ = function (da) {
		var dmk,
			mks=[];
		da.getMdArray().forEach(function(mkele){
			mks.push({'text' : mkele.getHtmlNoimg(), 'imgs' : mkele.getImgMinTag()});
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

router.get('/getarea', function (req, res) {
	ipresolve.isChina(req, function (result) {
		res.send(result?'zh':'en');
	});
})

router.get('/gettext', function(req, res) {
	var paths = {"header":"views/header.txt", 
				"home":"views/home/home.txt", 
				"design":"views/design/design.txt",
				"bottom":"views/bottom.txt"};
	var params = url.parse(req.url, true).query;
	fs.readFile(paths[params.page], function(err, data) {
		if(err)
			res.send({});
		else{
			var txt ;
			try{
				txt = JSON.parse(data);
			} catch(e){
				logger.error('err , json parse file '+paths[params.page] + e);
				res.send({});
				return ;
			}
			if( params.language == 'zh' )
				res.send(txt.zh || txt.en);
			if( params.language == 'en')
				res.send(txt.en || txt.zh);
		}
	});
});

router.post('/contactform', function(req, res) {
	var content = "Tom: \n    "+req.body.name+" send a message to you via radxa landing page.\n His email is '"+req.body.email +"', message is :\n    "+req.body.message+'\n';
	email.emailtom(content);
	res.send('succese');
});

module.exports = router;
