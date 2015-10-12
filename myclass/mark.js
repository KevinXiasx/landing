var marked = require('marked');
var fs = require('fs');
var path = require('path');
var cheerio = require("cheerio");

function readmark (pa, callback) {
	fs.readFile(pa,  'utf8', function (err, data) {
		if(err)
			console.log(err);
		else{
			var s = marked(data);
			callback(s);
		}
	})
}

function readmarkdir(pa , callback){
	var marks = new Array();
	var index;
	var count = 0,
		contu2 = 0;
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (var i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						$ = cheerio.load(data);
						var img = '';
						if( $('img').length != 0 )
							img = '<img src="'+$('img').attr('src') +'"/>';
						$('img').remove();
						marks.push({"text":$.html(), "img":img});
						count--;
						if(count == 0 && contu2 == 1)
							callback( marks , index);
					})
				}
				if( path.extname(files[i]) == ".dmd" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						index = data;
						count--;
						if(count == 0 && contu2 == 1)
							callback( marks , index);
					});
				}
			}
			contu2 = 1;
		}
	})
}


function readmarkdirs(pa , callback){
	var marks = new Array();
	var index;
	var count = 0,
		contu2 = 0;
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (var i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						$ = cheerio.load(data);
						var img = new Array();
						var ele = $('img');
						if( ele.length != 0 ){
							for (var k = ele.length - 1; k >= 0; k--) {
								img.push('<img src="'+ele.eq(k).attr('src')+'"/>');
							};
						}
						$('img').remove();
						marks.push({"text":$.html(), "imgs":img});
						count--;
						if(count == 0 && contu2 == 1)
							callback( marks , index);
					})
				}
				if( path.extname(files[i]) == ".dmd" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						index = data;
						count--;
						if(count == 0 && contu2 == 1)
							callback( marks , index);
					});
				}
			}
			contu2 = 1;
		}
	})
}

function readmarkname (pa, callback) {
	var marks = new Array();
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (var i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					marks.push(files[i]);
				}
			}
			callback( marks );
		}
	})
}

function readnameimg(pa , callback){
	var marks = new Array();
	var index;
	var count = 0,
		contu2 = 0;
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (var i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						$ = cheerio.load(data);
						var ele = $('img').first().attr('src');
						var tit = $('h2').text();
						$('img').remove();
						marks.push({"name":tit, "imgs":ele});
						count--;
						if(count == 0 && contu2 == 1)
							callback( marks );
					})
				}
			}
			contu2 = 1;
		}
	})
}

exports.readmark = readmark;
exports.readmarkdir = readmarkdir;
exports.readmarkdirs = readmarkdirs;
exports.readmarkname = readmarkname;
exports.readnameimg = readnameimg;