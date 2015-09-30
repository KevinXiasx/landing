var express = require('express');
var fs = require('fs');
var router = express.Router();
var markdown = require('markdown').markdown;
var MongoClient = require('mongodb').MongoClient;
var url = require("url");

var dataurl = 'mongodb://localhost:27017/landing';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("home/landing");
});


router.get('/gettext', function(req, res, next) {
	var params = url.parse(req.url, true).query;
	MongoClient.connect(dataurl, function(err, db) {
		if(err)	 {
			console.log(err);
			db.close();
		}
	  	else{
	  		var collection = db.collection('text');
	  		collection.find({"language_active":params.language}).toArray(function(err, docs) {
	  			res.send(docs[0]);
	  		});
	  	}
	});
})

router.get('/project', function (req, res, next) {
	fs.readFile('views/project/note-words.md', 'utf8', function (err, data) {
		if(err)
			console.log(err);
		else{
			var renderdata = {'markdown': markdown.toHTML(data)};
			res.render('project/projectpage', renderdata);
			console.log(markdown.toHTML(data));
		}
	});
})

module.exports = router;
