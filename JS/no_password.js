$(document).ready(function(){
    
    $('form').submit(false);
    
    var clicked = false;
    
    $("#check_email_btn").unbind('click');
    $('#check_email_btn').click(function(){
       
        if(clicked == false)
        {
            clicked = true;
            
            setTimeout(function(){
                clicked = false;
            }, 1000);
        
            var email = $('#no_pass_email_input').val();

            if(email != "")
            {
                $.post("no_password.php", {check_email:email}, function(ans){

                    $('#after_login').fadeOut(200, function(){

                        if(ans == "ok")
                        {
                            $('#after_login').empty().append('Wpisz kod potwierdzający, który wysłaliśmy na podany przez Ciebie adres email:<br /><input id="conf_pass_code_input" class="login_text_input" type="text" name="conf_pass_code"><input id="conf_code_login_btn" class="login_btn" name="confirm" type="submit" value="Potwierdź"><script src="JS/confirm_pass_code.js"></script>').fadeIn(500);

                            var value = 'header("Refresh:0");';

                            $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                                $('#menu_reload').empty().append(data);

                            });
                        }
                        else if(ans == "brakkont")
                        {
                            $('#after_login').empty().append('<span style="color:#a00000; font-weight:700;">Do podanego adresu email nie jest przypisane żadne konto.</span> <br /><br /> <input id="gobackconfirmemail_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);

                            $("#gobackconfirmemail_btn").unbind('click');
                            $('#gobackconfirmemail_btn').click(function(){

                                $('#after_login').fadeOut(500, function(){
                                    $('#no_pass_email_input').val('');
                                    $('#after_login').empty().append('Podaj adres email, do którego przypisane jest Twoje konto:<br /><form><input id="no_pass_email_input" class="login_text_input" type="text" name="check_email" required><input id="check_email_btn" class="login_btn" name="check_email_btn" type="submit" value="Wyślij"></form><script src="JS/no_password.js"></script>').delay(50).fadeIn(500);
                                });
                            });
                        }

                    });

                });
            } 
        }
        
    });
    
});