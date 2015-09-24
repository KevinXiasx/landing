var express = require('express');
var fs = require('fs');
var router = express.Router();
var markdown = require('markdown').markdown;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/landing');
});

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
