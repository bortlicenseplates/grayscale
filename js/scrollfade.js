$(function(){
	var fadeout = 0;
	var mfade = 1;
	var lastScrollTop;
	$(window).scroll(function(event){
		var st = $(this).scrollTop();
        if(st <= 0) {
        	$('#menu').css({'display' : 'none'});
    	} else {
    		$('#menu').css({'display' : 'flex'});
    	}
	    fadeout = 0.99 - (st * 0.003);
	    mfade = st*0.003
	    lastScrollTop = st;
	    $('#startpage').css({'opacity' : fadeout});
	    $('#menu').css({'opacity' : mfade});
    });
	
});