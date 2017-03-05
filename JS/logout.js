was_logged = false;
logout_by_click = false;

/*$("#logout_btn").unbind('click');
$('#logout_btn').click(function(){
    
    logout_by_click = true;
    
    logout();

});*/

function logout()
{   
    is_admin = false;
    clearInterval(chat_interval);
    
    $('#panel_klienta_btn').removeClass('active');
    $('#aktualnosci_btn').addClass('active');
    last_clicked = 'aktualnosci_btn';
    
    if($('#open_case_cloud').css('display') != 'none')
    {
        $('#open_case_cloud').fadeOut(500);
    }

    if($('#mini_info_cloud').css('display') != 'none')
    {
        $('#mini_info_cloud').fadeOut(500);
    }
    
    if($('#info_cloud').css('display') != 'none')
    {
        $('#info_cloud').fadeOut(500);
    }
    
    setTimeout(function(){
        
        $('#menu, #content').fadeIn(300);
        
    }, 500);
    
    $('#panel_admina_btn').remove();
    $('#border').remove();
    $('#border2').remove();
    $('#zagraj_btn').remove();
    $('#logout_btn').remove();
    $('#sklep_btn').remove();
    
    $('#chat_box').fadeOut(250);
    $('#chat_box').animate({height: "40px"}, 250);
    $('#chat_title').css('-webkit-box-shadow', 'none');
    $('#chat_title').css('-moz-box-shadow', 'none');
    $('#chat_title').css('box-shadow', 'none');
    
    $.post("index.php", {transporter2:"regenerate" });

    var value = 'header("Refresh:0");';

    $('#deep_content').fadeOut(300, function(){
        $.get('pages/aktualnosci.php', { transporter:value }, function(data){ 

            $.get('logout.php', { transporter:value }, function(data){ 

                $('#deep_logout').empty().append(data);

                $.get('pages/aktualnosci.php', { transporter:value }, function(data){
                    $('#deep_content').empty().append(data);
                    
                    
                    if($('#content').css('height') != '92%')
                    {
                        $('#content').css('padding', '5px');
                        $('#content').css('height', '92%');
                    }
                    
                    $('#deep_content').delay(200).fadeIn(200);
                });

            });

        });
    });
    
}

//Sprawdzianie co 10sec czy użytkownik nie został wylogowany.
setInterval(function(){
    
    var value = 'header("Refresh:0");';
    $.get("iflogged.php", {transporter:value}, function(odpowiedz){

        if(odpowiedz == "niezalogowany" && was_logged == true && logout_by_click == false)
        {
            was_logged = false;
            logout_by_click = false;

            if($('#open_case_cloud').css('display') != 'none')
            {
                $('#open_case_cloud').fadeOut(500);
            }

            if($('#mini_info_cloud').css('display') != 'none')
            {
                $('#mini_info_cloud').fadeOut(500);
            }

            if($('#info_cloud').css('display') != 'none')
            {
                $('#info_cloud').fadeOut(500);
            }

            logout();

            setTimeout(function(){

                $('#menu, #content').fadeOut(350, function(){
                    
                    $('#info_cloud_content').empty().append('<div style="display: block; text-align: center; font-size: 1.5em; padding-top: 20px;">Byłeś(aś) nieaktywny(a) przez dłuższy czas! <br /><br /> <span style="font-size: 0.8em; color: rgba(255, 255, 255, 0.5);">W celu zapewnienia bezpieczeństwa zostałeś(aś) automatycznie wylogowany(a). :)</span></div>');

                    $('#bg_blur').fadeIn(250);
                    $('#info_cloud').fadeIn(500);

                });

            }, 1000);
        }
        else if(odpowiedz == "admin" || odpowiedz == "zalogowany")
        {
            logout_by_click = false;
            was_logged = true;
        }

    });

}, 10000);