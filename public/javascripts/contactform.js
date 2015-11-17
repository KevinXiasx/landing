define(function(require, exports, module) {
	var $ = require('jquery');

	$('button[type=submit]').on('click', function (event) {
		event.preventDefault();
		if( $('#inputEmail3').val() == "" || $('#textarea3').val() == "" ){
			alert("Email\(*\) and Message\(*\) is necessary");
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
					alert('message has received !')
				},
			'error' : function () {
					alert('loading fail, network disconnect');
				}
		});
	})
})