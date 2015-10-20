"use strict";

let express = require('express');
let fs = require('fs');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let url = require("url");
let mark = require("../myclass/mark.js");

const dataurl = 'mongodb://localhost:27017/landing';

/* GET home page. */
router.get('/', (req, res, next) => {
	mark.readnameimg('views/project/markdown-ch/', function (data) {	
		res.render("home/landing", {"projectname": data});
	})
});


router.get('/gettext', (req, res, next) => {
	let params = url.parse(req.url, true).query;
	MongoClient.connect(dataurl, function(err, db) {
		if(err)	 {
			console.log(err);
			db.close();
		}
	  	else{
	  		let collection = db.collection( params.page );
	  		let language = (params.language == '')||(params.language == 'null')||(params.language == undefined)?'中文':params.language;
	  		collection.find({"language_active":language}).toArray(function(err, docs) {
	  			res.send(docs[0]);
	  		});
	  	}
	});
})

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
	console.log(req.body);
	res.send('succese');
})


module.exports = router;
