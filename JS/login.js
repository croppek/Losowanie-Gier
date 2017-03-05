$(document).ready(function(){
    
    if($('#sign_cloud').css("display") == "none")
    {
        login_popup();
    }
    
});

function login_popup()
{
    $('#bg_blur').fadeIn(300, function(){

        $('#menu, #content').fadeOut(300, function(){

            $('#sign_cloud').fadeIn(300);
               
        });

    });
}