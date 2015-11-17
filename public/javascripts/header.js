define(function(require, exports, module) {

 	var $ = require('jquery');
 	require('jq-transition');

	var stdhight_header = 0;
	var state_header = "hight";
	var direc_header;

	$(document).on('scroll', function () {
		if( $(window).scrollTop() - stdhight_header <= 0 )	
			direc_header = 'up';
		else
			direc_header = 'down';
		stdhight_header = $(window).scrollTop();

		if( direc_header == 'down' && state_header == 'hight'){
			$('#header').transition({y:-45});
			$('#header .navbar-header').transition({scale: 0.6, y:30});
			state_header = 'tall';
		}
		else if( direc_header == 'up' && state_header == 'tall' && $(window).scrollTop()<100){
			$('#header').transition({y:0});
			$('#header .navbar-header').transition({scale: 1, y:0});	
		 	state_header = 'hight';		
		}
	});
});