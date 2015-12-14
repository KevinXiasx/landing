var http = require('http');

var mongoose = require('mongoose');

var opts = { user:"landingpage",pass:"R0ck.me@sz"};
mongoose.connect('mongodb://127.0.0.1:27612/landingpage', opts);

var ipaddr = new mongoose.Schema({
        ipfrom:Number,
        ipto: Number,
});

var ipaddress = mongoose.model('ipaddress', ipaddr);


//向数据库中查询ip是否在数据库中，CHINA的IP范围，cb回调函数，返回bool值
var serchIp = function (ip ,cb){
	ipaddress.find({'ipfrom':{$lte:ip}, 'ipto':{$gte:ip}}, function(err, data) {
		if(err || data.length === 1)
			cb(true);
		else
			cb(false); 
	})
}

var istype = function (type) {
	return function (obj) {
		return Object.prototype.toString.call(obj) === '[object '+type+']'
	}
}

//将parseIp4()得到的字符串数组，转化为一个int类型的ip
var strip_to_Intip = function(strIp){
	var isString = istype('String');
	if( isString(strIp) ){
		var ipArray = strIp.split('.');
		var intIp = 0;
		for (var i = 0; i < ipArray.length; i++) {
			intIp += parseInt(ipArray[i])*Math.pow(256, 3-i);
		};
		return intIp;
	}else
		throw new Error('ip format err !');
}

/*获取http请求方的ip地址
	req: express框架的request对象
	返回值: IP字符串
*/
var getip =  function (req) {
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
        var forwardedIps = forwardedIpsStr.split(',');
        ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress||req.socket.remoteAddress ||req.connection.socket.remoteAddress;
    }
    ipAddress = ipAddress.substr(ipAddress.lastIndexOf(':')+1);
    return ipAddress;
}

/*确认req的请求方的IP地址，是否在中国

	req: express框架的request对象
	cb: 回调函数，参数只有一个bool，确认结果

*/
var isChina = function(req, cb){
	var ip = getip(req);
	if( ip == '127.0.0.1' ){
		cb(true);
		return ;
	}
	var intIp = strip_to_Intip(ip);
	serchIp( intIp , function (result) {
		cb(result);
	});
}

exports.isChina = isChina;
