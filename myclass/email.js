'use strict';

var nodemailer = require('nodemailer');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
transporter.sendMail({
    from: 'xxiiaass@sina.com',
    to: 'kevin@radxa.com',
    subject: 'hello',
    text: 'hello world! dsf'
}, function (err) {
	if(err)
		console.log(err);
});