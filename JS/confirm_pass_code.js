$(document).ready(function(){
    
    $("#conf_code_login_btn").unbind('click');
    $('#conf_code_login_btn').on('click', function(){
        
        $('#after_login').fadeOut(350, function(){
        
            var code = $('#conf_pass_code_input').val();
            code = code.toUpperCase();
            
            $.post("confirm_pass_code.php", {conf_pass_code:code}, function(ans){

                if(ans == "true")
                {
                    $('#after_login').empty().append('Podaj nowe hasło:<br /><input id="change_pass_input" class="login_text_input" type="password" name="zmien_haslo">Powtórz hasło:<br /><input id="change_pass_input2" class="login_text_input" type="password" name="zmien_haslo2"><input id="change_pass_submit_btn" class="login_btn" name="change_pass_btn" type="submit" value="Zmień hasło"><div id="incorrect_pass_text2" style="display: none; color: red; font-size: 0.7em; margin: -5px 0 0; padding: 0;"></div><script src="JS/change_password.js"></script>').fadeIn(500);
                }
                else if(ans == "false")
                {
                    $('#after_login').empty().append('<span style="color:#a00000; font-weight:700;">Podałeś niepoprawny kod potwierdzający.</span> <br /><br /> <input id="gobackconfirmpass_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
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
    });
    
});