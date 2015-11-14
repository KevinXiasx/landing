"use strict";

let marked = require('marked');
let fs = require('fs');
let path = require('path');
let cheerio = require("cheerio");

let readmark = function (pa, callback) {
	fs.readFile(pa,  'utf8', function (err, data) {
		if(err)
			console.log(err);
		else{
			let s = marked(data);
			callback(s);
		}
	})
}

function readmarkdir(pa , callback){
	let marks = Array();
	let index;
	let count = 0;
	let count2 = 0;

	fs.readdir(pa, (err, files) => {
		if(err)
			console.log(err);
		else{
			for (let i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						let $ = cheerio.load(data);
						let img = '';
						if( $('img').length != 0 )
							img = $('img').attr('src');
						$('img').remove();
						marks.push({"text":$.html(), "img":img});
						count--;
						if(count == 0 && count2 == 1)
							callback( marks , index);
					})
				}
				if( path.extname(files[i]) == ".dmd" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						index = data;
						count--;
						if(count == 0 && count2 == 1)
							callback( marks , index);
					});
				}
			}
			count2 = 1;
		}
	})
}


function readmarkdirs(pa , callback){
	let marks = new Array();
	let index;
	let count = 0,
		count2 = 0;
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (let i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						let $ = cheerio.load(data);
						let img = new Array();
						let ele = $('img');
						if( ele.length != 0 ){
							for (let k = ele.length - 1; k >= 0; k--) {
								img.push('<img src="'+ele.eq(k).attr('src')+'-min'+'"/>');
							};
						}
						$('img').remove();
						marks.push({"text":$.html(), "imgs":img});
						count--;
						if(count == 0 && count2 == 1)
							callback( marks , index);
					})
				}
				if( path.extname(files[i]) == ".dmd" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						index = data;
						count--;
						if(count == 0 && count2 == 1)
							callback( marks , index);
					});
				}
			}
			count2 = 1;
		}
	})
}

function readmarkname (pa, callback) {
	let marks = new Array();
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (let i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					marks.push(files[i]);
				}
			}
			callback( marks );
		}
	})
}

function readnameimg(pa , callback){
	let marks = new Array();
	let index;
	let count = 0,
		count2 = 0;
	fs.readdir(pa, function (err, files) {
		if(err)
			console.log(err);
		else{
			for (let i = files.length - 1; i >= 0; i--) {
				if( path.extname(files[i]) == ".md" ){
					count++;
					readmark(path.join(pa, files[i]), function (data) {
						let $ = cheerio.load(data);
						let ele = $('img').first().attr('src');
						let tit = $('h2').text();
						$('img').remove();
						if(marks.length < 4)
							marks.push({"name":tit, "imgs":ele});
						count--;
						if(count == 0 && count2 == 1)
							callback( marks );
					})
				}
			}
			count2 = 1;
		}
	})
}

exports.readmark = readmark;
exports.readmarkdir = readmarkdir;
exports.readmarkdirs = readmarkdirs;
exports.readmarkname = readmarkname;
exports.readnameimg = readnameimg;