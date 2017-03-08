//clickdown.js
$(function(){
	$(window).scroll(function (event) {
		var top = $(window).scrollTop();
		$('span.destroyed').click(function() {
			$('html, body').animate({
				scrollTop: $("#content").offset().top
			}, 500);
		});
	});
});