'use strict';

let fs = require('fs');
let path = require('path');
let pro = new Promise((resolve, reject) => {
	fs.readdir('.', function (err, data) {
		if(err)
			reject(err);
		else{
			resolve(data);
		}
	})
})

pro.then( (value) => {
	let resule = Array();
	for( let s in value){
		fs.stat( path.join('.', value[s]), (err, state) => {
			console.log(state);
			resule.push({'file':this, 'dir': state.isDirectory()});
		})
	}
	return resule;
}).then( resule => {
/*	console.log(resule);*/
});