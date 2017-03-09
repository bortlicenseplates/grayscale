$(function(){
    $('#dropdown').click(function(){
        
          $( "#menu-show" ).slideToggle( "slow", function() {
		    // Animation complete.
		  });
    });

    $('.interview').click(function(){
        
          $( "#interview-content" ).slideToggle( "fast", function() {
		    // Animation complete.
		  });
    });
});