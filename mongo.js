var mongo = new Mongo();

var db = mongo.getDB("landing");

db.home.drop();
db.module.drop();

db.home.insert({
	"language_active": "English",
	
	"h1":"Your idea, your product",

	"p1_t1":"What we offer", 

	"p2_t1":"Open Source Hardwarefor everyone",
	"p2_t2":"Free access to the design of modern electronic devices by us",
	"p2_t3":"We provide open source hardware platform for prototyping, the software hardware design is freely available from the internet, no NDA required. These software/hardware design is verified and ready to use. Anyone can edit/modify to develop their own products.",

	"p3_t1":"Design service",
	"p3_t2":"Your idea to a real prototype , in 4 weeks",
	"p3_t3":"By re-use the design of open source hardware(including the software stack, supply chain), we can provide quick customised prototyping service. Customer can choose various hardware platform and configuration.",

	"p4_t1":"factory",
	"p4_t2":"make it in here",
	"p4_t3":"灵活的按需生产，无论是一个还是一万个，我们同样对待。",


});

db.home.insert({
	"language_active": "中文",

	"h1":"个性化的科技让生活更美好",

	"p1_t1":"我们提供", 

	"p2_t1":"开发平台",
	"p2_t2":"人人都可以随意获取的开源硬件",
	"p2_t3":"我们提供符合OSHW标准的开源硬件，每个人都可以自由、免费的获取设计原理，生产资料，软件代码",

	"p3_t1":"设计服务",
	"p3_t2":"想法变成看得到摸得着的原型",
	"p3_t3":"从产品理念到技术细节，从原理设计到样品细节，我们和您紧密合作，共同把梦想变成现实。",

	"p4_t1":"生产服务",
	"p4_t2":"原型变成产品到每个人手上",
	"p4_t3":"灵活的按需生产，无论是一个还是一万个，我们同样对待。",

});


db.header.insert({
	"language_active": "中文",
	"language_2":"English",

	"company":"瑞莎科技",
	"menu_1":"维客",
	"menu_2":"商城",
	"menu_3":"社区",
	"menu_4":"项目"
});

db.header.insert({
	"language_active": "English",
	"language_2":"中文",

	"company":"Radxa",
	"menu_1":"Wiki",
	"menu_2":"Store",
	"menu_3":"Community",
	"menu_4":"Project"
});