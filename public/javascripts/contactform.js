define(function(require, exports, module) {
	var $ = require('jquery');

	$('button[type=submit]').on('click', function (event) {
		event.preventDefault();
		if( $('#inputEmail3').val() == "" || $('#textarea3').val() == "" ){
			$('.formmessage').text('Email\(*\) and Message\(*\) is necessary');
			$('#myModal').modal({
			  keyboard: false
			});
			return ;
		}
		if( !/\w+@\w+(\.\w)+/.test($('#inputEmail3').val()) ){
			$('.formmessage').text('Email\(*\) format is invalid!');
			$('#myModal').modal({
			  keyboard: false
			});
			return ;
		}
		if( !/\w+@\w+(\.\w)+/.test($('#inputEmail3').val()) ){
			alert("Email\(*\) format is invalid!");
			return ;
		}
		$.ajax({
			'url':'/contactform',
			'type' : 'post',
			'data' : {"name": $('#inputName3').val(),
					'company/project': $('#companyname').val(),
					"email": $('#inputEmail3').val(), 
					"message": $('#textarea3').val() },
			'success' : function (data) {
					$('#textarea3').val('');
					$('#textarea3').focus();
					$('.formmessage').text('message has received');
					$('#myModal').modal({
					  keyboard: false
					});
				},
			'error' : function () {
					$('.formmessage').text('loading fail, network disconnect');
					$('#myModal').modal({
					  keyboard: false
					});
				}
		});
	})
})