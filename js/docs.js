jQuery(function($){
	$('.env-toggle button').click(function(){
		var sandbox = $(this).hasClass('sandbox');
		$('.env .sandbox')[sandbox ? 'show' : 'hide']();
		$('.env .production')[!sandbox ? 'show' : 'hide']();
		$('button', $(this).parent('.btn-group')).removeClass('active');
		$(this).addClass('active');
	});
});