var mongo = new Mongo();

var db = mongo.getDB("landing");

db.text.drop();

db.text.insert({
	"language_active": "English",
	"language_2":"中文",

	"h1":"Your idea, your product",
	"h2":"We help to make it",

	"p1_t1":"What we offer", 

	"p2_t1":"Open Source Hardwarefor everyone",
	"p2_t2":"Free access to the design of modern electronic devices by us",
	"p2_t3":"We provide open source hardware platform for prototyping, the software hardware design is freely available from the internet, no NDA required. These software/hardware design is verified and ready to use. Anyone can edit/modify to develop their own products.",

	"p3_t1":"Design service",
	"p3_t2":"Your idea to a real prototype , in 4 weeks",
	"p3_t3":"By re-use the design of open source hardware(including the software stack, supply chain), we can provide quick customised prototyping service. Customer can choose various hardware platform and configuration.",


});

db.text.insert({	
	"language_active": "中文",
	"language_2":"English",

	"h1":"Your idea, your product",
	"h2":"We help to make it",

	"p1_t1":"What we offer", 

	"p2_t1":"Open Source Hardwarefor everyone",
	"p2_t2":"Free access to the design of modern electronic devices by us",
	"p2_t3":"We provide open source hardware platform for prototyping, the software hardware design is freely available from the internet, no NDA required. These software/hardware design is verified and ready to use. Anyone can edit/modify to develop their own products.",

	"p3_t1":"设计服务",
	"p3_t2":"你的想法和你的产品之间，只有４周",
	"p3_t3":"By re-use the design of open source hardware(including the software stack, supply chain), we can provide quick customised prototyping service. Customer can choose various hardware platform and configuration."
});

