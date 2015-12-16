define(function(require, exports, module) {

 	var $ = require('jquery');
 	require('jq-transition');

	var stdhight_header = 0;
	var state_header = "hight";
	var direc_header;
	$(document).on('scroll', function () {　//这个函数同于控制顶部的控件伸缩大小
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


//下面的代码用于补偿显示图片、弹窗的模态框弹出时，header的偏移。
	var measureScrollbar = function () {
	    var scrollDiv = document.createElement('div');
	    scrollDiv.className = 'modal-scrollbar-measure';
	    $(document.body).append(scrollDiv);
	    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
	    $(document.body)[0].removeChild(scrollDiv);
	    return scrollbarWidth;
	}

	$('#myModal, #portfolioModal1').on('show.bs.modal', function (e) {
  		$('#header').css('padding-right', measureScrollbar()+'px');
	});

	$('#myModal, #portfolioModal1').on('hidden.bs.modal', function (e) {
  		$('#header').css('padding-right', '0px');
	});
});