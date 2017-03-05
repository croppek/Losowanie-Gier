$(document).ready(function(){
    
    $('form').submit(false);
    
    $('#kontakt_name_input').attr('placeholder', 'Jan Kowalski');
    $('#kontakt_name_input').focus(function(){
        $(this).attr('placeholder', '');
    });
    $('#kontakt_name_input').blur(function(){
        $(this).attr('placeholder', 'Jan Kowalski');
    });
    
    $('#kontakt_email_input').attr('placeholder', 'janek@amorki.pl');
    $('#kontakt_email_input').focus(function(){
        $(this).attr('placeholder', '');
    });
    $('#kontakt_email_input').blur(function(){
        $(this).attr('placeholder', 'janek@amorki.pl');
    });
    
    $('#kontakt_text_input').attr('placeholder', 'Tutaj możesz napisać wiadomość, zadać nam pytanie lub opisać problem. :)');
    $('#kontakt_text_input').focus(function(){
        $(this).attr('placeholder', '');
    });
    $('#kontakt_text_input').blur(function(){
        $(this).attr('placeholder', 'Tutaj możesz napisać wiadomość, zadać nam pytanie lub opisać problem. :)');
    });
    
    var send_clicked = false;
    $("#send_msg_btn").unbind('click');
    $('#send_msg_btn').click(function(){
        
        if(send_clicked == false)
        {
            send_clicked = true;
            
            if($("#kontakt_name_input").val() != "" && $("#kontakt_email_input").val() != "" && $("#kontakt_text_input").val() != "")
            {
                $('#incorrect_pass_text').fadeOut(200);

                $('#deep_content').fadeOut(200, function(){

                    var imieinazwisko = $('#kontakt_name_input').val();
                    var email = $('#kontakt_email_input').val();
                    var tresc = $('#kontakt_text_input').val();

                    $.post("send_message.php", {kontakt_name:imieinazwisko, kontakt_email:email, kontakt_text:tresc}, function(result){

                        if(result == "true")
                        {
                            $('#deep_content').empty().append("Twoja wiadomość została wysłana pomyślnie! <br /><br /> Biuro obsługi klienta rozpatrzy wiadomość i przekaże odpowiedź na podany adres email w przeciągu 24 godzin.").fadeIn(300);
                        }
                        else if(result == "false")
                        {
                            $('#deep_content').empty().append('Wystąpił błąd podczas wysyłania wiadomości..<br /> <input id="contact_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);
                        }
                        else if(result == "niepoprawnyemail")
                        {
                            $('#deep_content').empty().append('Podany adres email jest niepoprawny.<br /> <input id="contact_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);
                        }
                        else if(result == "blad")
                        {
                            $('#deep_content').empty().append('Wystąpił błąd podczas przesyłania danych do pliku PHP.<br /> <input id="contact_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);
                        }
                        else
                        {
                            $('#deep_content').empty().append(result + '<br /> <input id="contact_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);
                        }

                        var value = 'header("Refresh:0");';
                        $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                            $('#menu_reload').empty().append(data);  
                        });

                    });

                });
            }
            else if($("#kontakt_name_input").val() == "" || $("#kontakt_email_input").val() == "" || $("#kontakt_text_input").val() == "")
            {
                $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Wszystkie pola muszą być wypełnione.</b>').fadeIn(300);
            }
            
            setTimeout(function(){
                send_clicked = false;
            }, 2000);
        }
        
    });
        
});