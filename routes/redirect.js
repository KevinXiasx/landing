var express = require('express');
var fs = require('fs');
var router = express.Router();
var url = require("url");
var logger = require('log4js').getLogger("index");
var path = require('path');

var tablefile = fs.readFileSync(path.join(__dirname, './routetable')).toString();
var redirecArray = tablefile.split('\n');

for (var i = 0; i < redirecArray.length; i++) {
	(function () {
		var urlRedirect = redirecArray[i];
		router.get(urlRedirect, function (req, res) {
			res.writeHead(302, {'Location' : "http://wiki.radxa.com"+urlRedirect});
			res.end();
		});
	})();
};

module.exports = router;
