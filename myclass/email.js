var fs = require('fs');
var exec = require('child_process').exec,
    child;
var ssmptconfig = fs.readFileSync('/etc/ssmtp/ssmtp.conf').toString('utf8');
var sendServer = ssmptconfig.match(/^AuthUser=([@\w.]+\.com)/m)[1];
var recivce = 'xxiiaass@sina.com';

var emailtom = function (centent) {
	var con = "To:"+recivce+"\nFrom: "+sendServer+"\nSubject: Landing page message!\n\n"
	child = exec('echo "'+con+centent +'" | /usr/sbin/ssmtp '+recivce,
		{"timeout":10000},
	  function (error, stdout, stderr) {
	    console.log('stdout: ' + stdout);
	    console.log('stderr: ' + stderr);
	    if (error) {
	      console.log('exec error: ' + error);
	    }
	});
	var time = new Date();
	fs.appendFile("message.md", time + '\n' + centent + '\n' ,function (err) {
		if(err)
			console.log(err);
	});
}

exports.emailtom = emailtom;