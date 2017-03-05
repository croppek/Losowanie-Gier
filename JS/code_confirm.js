$(document).ready(function(){
    
    var clicked1 = false;
    
    $("#conf_code_btn").unbind('click');
    $('#conf_code_btn').on('click', function(){
        
        if(clicked1 == false)
        {
            clicked1 = true;
            
            setTimeout(function(){
                clicked1 = false;
            }, 1000);
            
            $('#confirm_account').fadeOut(350, function(){

                var code = $('#conf_code_input').val();
                code = code.toUpperCase();

                $.post("confirm_code.php", {conf_code:code}, function(ans){

                    if(ans == "true")
                    {
                        $('#confirm_account').empty().append('Dziękujemy za aktywację konta. <br /><br /> Możesz się już zalogować. :)').fadeIn(500);
                    }
                    else if(ans == "false")
                    {
                        $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Podałeś niepoprawny kod aktywacyjny.</span> <br /><br /> <input id="gobackconfirm_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                    }
                    else if(ans == "bladdodawania")
                    {
                        $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Wystąpił błąd podczas próby połączenia z bazą danych.</span><br /><br /> <input id="gobackconfirm_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                    }
                    else
                    {    
                        $('#confirm_account').empty().append(ans).fadeIn(500);
                    }

                var value = 'header("Refresh:0");';
                $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                    $('#menu_reload').empty().append(data);  
                });

                });
            });
        }
    });
    
    var clicked2 = false;
    
    $("#conf_code_login_btn").unbind('click');
    $('#conf_code_login_btn').on('click', function(){
        
        if(clicked2 == false)
        {
            clicked2 = true;
            
            setTimeout(function(){
                clicked2 = false;
            }, 1000);
            
            $('#after_login').fadeOut(350, function(){

                var code = $('#conf_code_input').val();
                code = code.toUpperCase();

                $.post("confirm_code.php", {conf_code:code}, function(ans){

                    if(ans == "true")
                    {
                        $('#after_login').empty().append('Dziękujemy za aktywację konta. <br /><br /> Możesz się już zalogować. :)').fadeIn(500);

                    }
                    else if(ans == "false")
                    {
                        $('#after_login').empty().append('<span style="color:#a00000; font-weight:700;">Podałeś niepoprawny kod aktywacyjny.</span> <br /><br /> <input id="gobackconfirmlogin_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                    }
                    else if(ans == "bladdodawania")
                    {
                        $('#after_login').empty().append('<span style="color:#a00000; font-weight:700;">Wystąpił błąd podczas próby połączenia z bazą danych.</span><br /><br /> <input id="gobackconfirmlogin_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
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
    });
    
});