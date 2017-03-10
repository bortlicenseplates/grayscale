$(function(){
    $('#dropdown').click(function(){
      $( "#menu-show" ).slideToggle( "slow", function() {
		    // Animation complete.
		  });
    });

    $('.moreclick').click(function(){
      $( "#interview-content" ).slideToggle( "fast", function() {
		    // Animation complete.
		  });
    });
});