"use strict";

let express = require('express');
let fs = require('fs');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = require("url");
let mark = require("../myclass/mark.js");
let email = require("../myclass/email.js");

const dataurl = 'mongodb://localhost:27017/landing';

/* GET home page. */
router.get('/', (req, res, next) => {
	mark.readnameimg('views/project/markdown-ch/', function (data) {	
		res.render("home/landing", {"projectname": data});
	})
});

router.get('/gettext', (req, res, next) => {
	let paths = {"header":"views/header.txt", "home":"views/home/home.txt"};
	let params = url.parse(req.url, true).query;
	fs.readFile(paths[params.page], (err, data) => {
		if(err)
			console.log(err);
		else{
			let txt = JSON.parse(data);
			if( params.language == '' || params.language == '中文'){
				res.send(txt.ch);
			}
			else{
				res.send(txt.en);
			}
		}
	});
});

router.get('/project', (req, res, next) => {
	mark.readmarkdirs('views/project/markdown-ch/', function (data, index) {
		res.render('project/projectpage', {"marks": data, "index": index});
	});
})

router.get('/designservice', (req, res, next) => {
	mark.readmarkdirs('views/more/design-mark-ch/', function (data, index) {
		res.render('project/projectpage', {"marks": data, "index": index});
	});
})


router.get('/platform-ch', (req, res, next) => {
	mark.readmarkdir('views/more/plat-mark-ch/', function (data, index) {
		res.render('more/more', {"marks": data, "index": index});
	});
})

router.get('/platform-en', (req, res, next) => {
	mark.readmarkdir('views/more/plat-mark-en/', function (data, index) {
		res.render('more/more', {"marks": data, "index": index});
	});
})

router.post('/contactform', (req, res, next) => {
	let content = "Tom: \n    "+req.body.name+" send a message to you via radxa landing page.\n His email is '"+req.body.email +"', message is :\n    "+req.body.message+'\n';
	email.emailtom(content);
	res.send('succese');
})


module.exports = router;
