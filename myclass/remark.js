"use strict";

let marked = require('marked');
let fs = require('fs');
let path = require('path');
let cheerio = require("cheerio");
let events = require("events");


class mark {

	tohtml(file, callback){
		fs.readFile(file,  'utf8', (err, data) => {
			if(err)
				console.log(err);
			else{
				let s = marked(data);
				callback(s);
			}
		}
	}

	getimgsrc(html){
		let $ = cheerio.load(html);
		let src = new Array();
		let ele = $('img');
		if( ele.length != 0 ){
			for (let k = ele.length - 1; k >= 0; k--) {
				src.push(ele.eq(k).attr('src'));
			};
		}
		$('img').remove();
		return {"text":$.html(), "imgsrc":img};
	}

	getfile(ext, dir, callback){
		let result = Array();
		fs.readdir(dir, (err, files) => {
			if(err)
				console.log(err);
			else{
				for (let i = files.length - 1; i >= 0; i--) {
					if( path.extname(files[i]) == ext ){
						result.push(files[i]);
					}
				}
				callback(result);
			}
		}
	}

	dirtohtml(path, callback){
		let result = Array();
		getfile('.md', path, (files) => {
			let count = files.length;
			for (let i = files.length - 1; i >= 0; i--) {
				tohtml(path.join(path, files[i]), (data) => {
					result.push( getimgsrc(data) );
					count--;
					if( count == 0)
						callback(result);
				}
			};
		})
	}

	getindex( path, callback ){
		getfile( 'dmd', path, (data) = > {
			tohtml(path.join(path, data), (html) {
				callback(html);
			})
		})
	}

	namesrc(path, callback){
		let count = 0;
		let result = Array();

		let after = function (key, value) {
			result[key] = value;
			count++;
			if( count == times)
				callback(result);
		}
		getfile('.md', path, (data)=>{
			after( 'name', data);
		});
	}


}