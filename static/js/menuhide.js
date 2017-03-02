$(function(){
        // Check the initial Poistion of the Sticky Header
    var stickyHeaderTop = $('#menu').offset().top;
 
    $(window).scroll(function(){
        if( $(window).scrollTop() > stickyHeaderTop ) {
            $('#menu').css({position: 'fixed', top: '0px'});
            // $('#menu-alias').css('display', 'block');
        } else {
            $('#menu').css({position: 'static', top: '0px'});
            // $('#menu-alias').css('display', 'none');
	    }
    });
});