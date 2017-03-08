$(function(){
    $('#dropdown').click(function(){
        if($('#menu-show').css('display') == 'none'){
            $('#menu-show').css({'display' : 'flex'});
        } else {
            $('#menu-show').css({'display' : 'none'});
        }
    });
});