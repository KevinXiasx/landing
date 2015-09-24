var fs = require('fs');
var path = require('path');

var pathcurren = 'fonts';

var dirs = fs.readdirSync(pathcurren);

var fd = fs.openSync("new.css", "w");

var s1 = '@font-face { \nfont-family: ';
var s3 = '; \n src:url("';

var s5 = '") format("truetype");\n}\n\n';


for (var i = dirs.length - 1; i >= 0; i--) {
	if( fs.statSync(path.join(pathcurren, dirs[i])).isDirectory() ){
		var dirss = fs.readdirSync(path.join(pathcurren, dirs[i]));
		for (var k = dirss.length - 1; k >= 0; k--) {
			var s2 = path.basename(dirss[k], '.ttf')
			var s4 = path.join(pathcurren ,dirs[i] ,dirss[k]);
			fs.writeSync(fd, s1+s2+s3+s4+s5);
		};
	}
};

fs.closeSync(fd);