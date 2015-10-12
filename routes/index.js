var express = require('express');
var fs = require('fs');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = require("url");
var mark = require("../myclass/mark.js");

var dataurl = 'mongodb://localhost:27017/landing';

/* GET home page. */
router.get('/', function(req, res, next) {
	mark.readnameimg('views/project/markdown/', function (data) {
		console.log(data);
		res.render("home/landing", {"projectname": data});
	})
});


router.get('/gettext', function(req, res, next) {
	var params = url.parse(req.url, true).query;
	MongoClient.connect(dataurl, function(err, db) {
		if(err)	 {
			console.log(err);
			db.close();
		}
	  	else{
	  		var collection = db.collection( params.page );
	  		var language = (params.language == '')||(params.language == 'null')||(params.language == undefined)?'中文':params.language;
	  		collection.find({"language_active":language}).toArray(function(err, docs) {
	  			res.send(docs[0]);
	  		});
	  	}
	});
})

router.get('/project', function (req, res, next) {
	mark.readmarkdirs('views/project/markdown/', function (data, index) {
		res.render('project/projectpage', {"marks": data, "index": index});
	});
})


router.get('/more', function (req, res, next) {
	mark.readmarkdir('views/more/', function (data, index) {
		res.render('more/more', {"marks": data, "index": index});
	});
	
})


module.exports = router;
