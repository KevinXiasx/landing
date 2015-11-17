var express = require('express');
var fs = require('fs');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = require("url");
var mark = require("../myclass/mark.js");
var email = require("../myclass/email.js");
var logger = require('log4js').getLogger("index");

const dataurl = 'mongodb://localhost:27017/landing';

/* GET home page. */
router.get('/', function(req, res, next) {
	mark.readnameimg('views/project/markdown-ch/', function (data) {
		res.render("home/landing", {"projectname": data,'page':'home'});
	});
});

router.get('/gettext', function(req, res, next) {
	var paths = {"header":"views/header.txt", 
				"home":"views/home/home.txt", 
				"design":"views/design/design.txt",
				"bottom":"views/bottom.txt"};
	var params = url.parse(req.url, true).query;
	fs.readFile(paths[params.page], function(err, data) {
		if(err){
			logger.error(err);
			res.render('error', {
			    message: err.message,
			    error: {}
			  });
		}
		else{
			var txt ;
			try{
				txt = JSON.parse(data);
			} catch(e){
				logger.error('err , json parse file '+paths[params.page] + e);
				res.send(null);
				return ;
			}
			if( params.language == '' || params.language == '中文' ){
				res.send(txt.ch);
			}
			else{
				if( typeof txt.en == 'undefined')
					res.send(txt.ch);
				else
					res.send(txt.en);
			}
		}
	});
});

router.get('/project', function(req, res, next) {
	mark.readmarkdirs('views/project/markdown-ch/', function (data, index) {
		res.render('project/projectpage', {"marks": data, "index": index, 'page':'project'});
	});
})

router.get('/designservice', function(req, res, next) {
	
	res.render('design/design',{'page':'design'});
})

router.get('/platform-ch', function(req, res, next) {
	mark.readmarkdir('views/more/plat-mark-ch/', function (data, index) {
		res.render('more/more', {"marks": data, "index": index, 'page':'more'});
	});
})

router.get('/platform-en', function(req, res, next) {
	mark.readmarkdir('views/more/plat-mark-en/', function (data, index) {
		res.render('more/more', {"marks": data, "index": index, 'page':'more'});
	});
})

router.post('/contactform', function(req, res, next) {
	var content = "Tom: \n    "+req.body.name+" send a message to you via radxa landing page.\n His email is '"+req.body.email +"', message is :\n    "+req.body.message+'\n';
	email.emailtom(content);
	res.send('succese');
})

module.exports = router;
