$(function(){

	var dir = "gallery/";

	$.ajax({
	    url : dir,
	    success: function (data) {
	        $(data).find("a").attr("href", function (i, val) {
	            if( val.match(/\.(jpe?g|png|gif)$/) ) { 
	                $("#gallery-content").append( "<img src=\""+ folder + val +"\">" );
	            } 
	        });
	    }
	});

});

	