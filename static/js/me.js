$(function () {
	var back = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
	var rand = "rgb("+back[0]+','+back[1]+','+back[2]+')';
	$('.me').css({'color' : 'white'});
	$('.me:hover').hover(function(e){
		$(e.target).css({'color' : rand});
  	});
});