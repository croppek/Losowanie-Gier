$(document).ready(function(){
    
    $('#change_pass_input,#change_pass_input2').blur(function(){
        
        checkPassword2();
        
    })
    
    var clicked = false;
    
    $("#change_pass_submit_btn").unbind('click');
    $('#change_pass_submit_btn').on('click', function(){
        
        if(clicked == false)
        {
            clicked = true;
            
            setTimeout(function(){
                clicked = false;
            }, 1000);
            
            if($("#change_pass_input").val() != "" && $("#change_pass_input2").val() != "" && (change_pass_conf == false || change_pass_conf2 == false))
            {
                checkPassword2();
            }
            else if($("#change_pass_input").val() != "" && $("#change_pass_input2").val() != "" && change_pass_conf2 == true)
            {
                $('#after_login').fadeOut(350, function(){

                    var haslo_nowe = $('#change_pass_input').val();
                    var haslo_nowe2 = $('#change_pass_input2').val();

                    $.post("change_password.php", {zmien_haslo:haslo_nowe, zmien_haslo2:haslo_nowe2,}, function(ans){

                        if(ans == "true")
                        {
                            $('#after_login').empty().append('Twoje hasło zostało pomyślnie zmienione.<br /><br /> Możesz się już zalogować. :)').fadeIn(500);
                        }
                        else if(ans == "false")
                        {
                            $('#after_login').empty().append('Wystąpił błąd podczas próby zmiany hasła w bazie danych. <br /> Spróbuj ponownie.').fadeIn(500);
                        }
                        else if(ans == "zladlugoschasla")
                        {
                            $('#after_login').empty().append('Hasło musi mieć od 8 do 20 znaków. <br /> Spróbuj ponownie.').fadeIn(500);
                        }
                        else if(ans == "haslaniesatakiesame")
                        {
                            $('#after_login').empty().append('Podane hasła nie są takie same. <br /> Spróbuj ponownie.').fadeIn(500);
                        }
                        else
                        {    
                            $('#after_login').empty().append(ans).fadeIn(500);
                        }

                        var value = 'header("Refresh:0");';
                        $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                            $('#menu_reload').empty().append(data);  
                        });

                    });
                });
            }
        }
    });
    
});

change_pass_conf = true;
change_pass_conf2 = true;

function checkPassword2()
{
    if($('#change_pass_input').val().length == 0 && $('#change_pass_input2').val().length == 0)
    {
        $('#change_pass_input, #change_pass_input2').css({"background-color": "rgb(51, 64, 87)"});
        $('#incorrect_pass_text2').fadeOut(200); 
        return;
    }
    else if($('#change_pass_input').val().length < 6 || $('#change_pass_input').val().length > 20)
    {
        change_pass_conf2 = false;
        $('#incorrect_pass_text2').fadeOut(200).empty().append('<b>Hasło musi mieć od 6 do 20 znaków.</b>').fadeIn(300);
    }
    else if($('#change_pass_input').val().length >= 6 && $('#change_pass_input').val().length <= 20)
    {
        change_pass_conf2 = true;
        
        if($('#change_pass_input2').val() != "" && $('#change_pass_input').val() != "")
        {
            var haslo1 = $('#change_pass_input').val();
            var haslo2 = $('#change_pass_input2').val();

            if(haslo1 == haslo2)
            {
                change_pass_conf = true;
                $('#change_pass_input, #change_pass_input2').css({"background-color": "rgba(7, 92, 0, 0.5)"});
                if(change_pass_conf2 == true)
                {
                    $('#incorrect_pass_text2').fadeOut(200);
                }
            }
            else
            {
                $('#change_pass_input, #change_pass_input2').css({"background-color": "rgba(111, 0, 0, 0.55)"});
                $('#incorrect_pass_text2').fadeOut(200).empty().append('<b>Podane hasła nie są takie same.</b>').fadeIn(300);
                change_pass_conf= false;
            }
        }
    }
}