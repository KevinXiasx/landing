var nodemailer = require('nodemailer');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('.emailconfig.json'));

var transporter = nodemailer.createTransport({
    host: config.fromemail.emailhost,
    port:465,
    secure:true,
    auth: {
        user: config.fromemail.user,
        pass: config.fromemail.password
    }
});

var emailtom = function (centent) {

	transporter.sendMail({
    	from: config.fromemail.user,
    	to: config.toemail.user,
    	subject: config.toemail.title,
    	text: centent
	}, function (err) {
		if(err){
			console.log(err);
		}
	});
	var time = new Date();
	fs.appendFile(config.savefile , time + '\n' + centent + '\n' ,function (err) {
		if(err)
			console.log(err);
	});
}

exports.emailtom = emailtom;