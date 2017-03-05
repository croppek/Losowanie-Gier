$(document).ready(function(){
    
    var register_clicked = false;
    
    $("#registry_submit_btn").unbind('click');
    $('#registry_submit_btn').on('click', function(){
        
        if(register_clicked == false)
        {
            register_clicked = true;
            
            setTimeout(function(){
                                    
                register_clicked = false;

            }, 1000);
            
            if($("#login_input").val() != "" && $("#haslo_input").val() != "" && $("#haslo2_input").val() != "" && $("#email_input").val() != "" && $("#age_input").val() != "" && $("#name_input").val() != "" && $("#last_name_input").val() != "" && $('#checkbox_input').prop("checked") != "false" && (conf_pass == false || conf_pass2 == false || conf_login == false || conf_login2 == false || conf_email == false || conf_captcha == false || ifchecked == "0"))
            {
                checkPassword();
                checkLogin();
                checkEmail();
                checkCaptcha();
                return;
            }
            else if($("#login_input").val() != "" && $("#haslo_input").val() != "" && $("#haslo2_input").val() != "" && $("#email_input").val() != "" && $("#age_input").val() != "" && $("#name_input").val() != "" && $("#last_name_input").val() != "" && $('#checkbox_input').prop('checked') == true && conf_pass == true)
            {            
                $('#incorrect_pass_text').fadeOut(200, function(){
                    $('#rejestracja').fadeOut(350, function(){
                        var login_r = $('#login_input').val();
                        var haslo_r = $('#haslo_input').val();
                        var haslo_r2 = $('#haslo2_input').val();
                        var email = $('#email_input').val();
                        var age = $('#age_input').val();
                        var name = $('#name_input').val();
                        var last_name = $('#last_name_input').val();
                        var recaptcha = grecaptcha.getResponse();

                        $.post("registry.php", {login_r:login_r, haslo_r:haslo_r, haslo_r2:haslo_r2, email:email, birth_date:age, name:name, last_name:last_name, transporter:recaptcha}, function(result){

                            if(result == "true")
                            {
                                $('#confirm_account').empty().append('Wpisz kod aktywacyjny, który wysłaliśmy na podany przez Ciebie adres email:<br /><input id="conf_code_input" class="login_text_input" type="text" name="conf_code"><input id="conf_code_btn" class="login_btn" name="confirm" type="submit" value="Aktywuj"><script src="JS/code_confirm.js"></script>').fadeIn(500);

                                grecaptcha.reset();
                            }
                            else if(result == "zladlugoscloginu")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Login musi mieć od 3 do 20 znaków.</span> <br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "logintylkozliterinumerow")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Login musi składać się tylko z liter i cyfr (bez polskich znaków).</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "niepoprawnyemail")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Proszę podać poprawny adres email.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "zladlugoschasla")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Hasło musi mieć od 6 do 20 znaków.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "haslaniesatakiesame")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Podane hasła nia są takie same.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "imietylkozliter")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Imię może składać się wyłącznie z liter.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "nazwiskotylkozliter")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Nazwisko może składać się wyłącznie z liter.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "wiektylkozcyfr")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Podano błędną datę urodzenia. Wymagany format to RRRR-MM-DD.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "potwierdzcaptche")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Musisz potwierdzić, że nie jesteś robotem (reCaptche).</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "zajetymail")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Istnieje już konto przypisane do podanego adresu email.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "zajetylogin")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Podany login jest już zajęty.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else if(result == "bladdodawania")
                            {
                                $('#confirm_account').empty().append('<span style="color:#a00000; font-weight:700;">Wystąpił błąd podczas próby połączenia z bazą danych.</span><br /><br /> <input id="goback_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);
                            }
                            else
                            {    
                                $('#confirm_account').empty().append(result).fadeIn(500);
                            }

                            var value = 'header("Refresh:0");';
                            $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                                $('#menu_reload').empty().append(data);
                                
                            });
                        });
                    });
                });
            }
            
        }
        
    });
    
    var login_clicked = false;
    
    $("#login_btn").unbind('click');
    $('#login_btn').click(function(){
        
        if(login_clicked == false)
        {
            login_clicked = true;
            
            setTimeout(function(){
                login_clicked = false;
            }, 1000);
            
            var login = $('#login_field').val();
            var haslo = $('#password_field').val();

            $.post("login.php", {login:login, haslo:haslo}, function(result){

                if(result == "true")
                {
                    $('#bg_blur').fadeOut(350);
                    $('#sign_cloud').fadeOut(350, function(){
                        $('#menu, #content').fadeIn(500);

                        $('#login_field').val(""); 
                        $('#password_field').val("");

                        var value = 'header("Refresh:0");';

                        $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 

                        $('#deep_content').empty().append(data);  
                        });
                    });
                }
                else if(result == "false")
                {
                    $('#logowanie').fadeOut(500, function(){
                        $('#after_login').empty().append('<span style="color:#a00000; font-weight:700;">Nie znaleziono użytkownika o takim loginie.</span><br /><br /><input id="gobacklogin_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);

                        var value = 'header("Refresh:0");';

                        $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                            $('#menu_reload').empty().append(data);

                        });

                        return;
                    });  
                }
                else if(result == "aktywujkonto")
                {
                    $('#logowanie').fadeOut(500, function(){

                        $('#after_login').empty().append('Wpisz kod aktywacyjny, który wysłaliśmy na podany przez Ciebie adres email:<br /><input id="conf_code_input" class="login_text_input" type="text" name="conf_code"><input id="conf_code_login_btn" class="login_btn" name="confirm" type="submit" value="Aktywuj"><script src="JS/code_confirm.js"></script>').fadeIn(500);

                        var value = 'header("Refresh:0");';

                        $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                            $('#menu_reload').empty().append(data);

                        });

                        return;
                    });  
                }
                else if(result == "nieprawidlowehaslo")
                {
                    $('#logowanie').fadeOut(500, function(){
                        $('#after_login').empty().append('<span style="color:#a00000; font-weight:700;">Nieprawidłowe hasło.</span><br /><br /><input id="gobacklogin_btn" class="login_btn" type="submit" value="Spróbuj ponownie">').fadeIn(500);

                        var value = 'header("Refresh:0");';

                        $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                            $('#menu_reload').empty().append(data);

                        });

                        return;
                    });  
                }
                else
                {    
                    $('#logowanie').fadeOut(500, function(){
                        $('#after_login').empty().append(result).fadeIn(500);
                    });
                }

                var value = 'header("Refresh:0");';

                $.get("iflogged.php", {transporter:value}, function(odpowiedz){
                    if(odpowiedz == "admin")
                    {
                        $('#menu ul').append('<li id="panel_admina_btn">Panel Admina</li>');
                        $('#panel_admina_btn').before('<div id="border2"></div>');
                        $('#border2').css({"border-bottom": "1px dashed rgba(206, 192, 132, 0.7)", display: "block", height: "10px", marginBottom: "10px"});

                        $('#menu ul').append('<li id="logout_btn">Wyloguj się</li>');
                        $('#logout_btn').before('<div id="border"></div>');
                        $('#border').css({"border-bottom": "1px dashed rgba(206, 192, 132, 0.7)", display: "block", height: "10px", marginBottom: "10px"});

                        $('#menu ul').prepend('<li id="sklep_btn">Sklep</li>');
                        $('#menu ul').prepend('<li id="zagraj_btn">Gry</li>');
                        
                        $('#chat_box').fadeIn(500);
                        
                        is_admin = true;
                        
                        chat_interval = setInterval(function(){
                            chat_refresh(chat_msg);
                        },2500);
                    }
                    else if(odpowiedz == "zalogowany")
                    {
                        $('#menu ul').append('<li id="logout_btn">Wyloguj się</li>');
                        $('#logout_btn').before('<div id="border"></div>');
                        $('#border').css({"border-bottom": "1px dashed rgba(206, 192, 132, 0.7)", display: "block", height: "10px", marginBottom: "10px"});

                        $('#menu ul').prepend('<li id="sklep_btn">Sklep</li>');
                        $('#menu ul').prepend('<li id="zagraj_btn">Gry</li>');
                        
                        $('#chat_box').fadeIn(500);
                        
                        is_admin = false;
                        
                        chat_interval = setInterval(function(){
                            chat_refresh(chat_msg);
                        },2500);
                    }
                    else
                    {
                        is_admin = false;
                        
                        $('#panel_admina_btn').remove();
                        $('#logout_btn').remove();
                        $('#border').remove();
                        $('#border2').remove();
                        $('#zagraj_btn').remove();
                        $('#sklep_btn').remove();
                        
                        $('#chat_box').fadeOut(250);
                        
                        clearInterval(chat_interval);
                    }

                    $.get('pages/reload_menu.php', { transporter:value }, function(data){ 

                        $('#menu_reload').empty().append(data);
                        
                    });
                });
            });
        }
    });
});

conf_pass = true;
conf_pass2 = true;

function checkPassword()
{
    if($('#haslo_input').val().length == 0 && $('#haslo_input').val().length == 0)
    {
        $('#haslo_input, #haslo2_input').css({"background-color": "rgb(51, 64, 87)"});
        if(conf_pass == true && conf_captcha == true && conf_login == true && conf_login2 && conf_email == true)
        {
            $('#incorrect_pass_text').fadeOut(200);
        }
        return;
    }
    else if($('#haslo_input').val().length < 6 || $('#haslo_input').val().length > 20)
    {
        conf_pass2 = false;
        $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Hasło musi mieć od 6 do 20 znaków.</b>').fadeIn(300);
    }
    else if($('#haslo_input').val().length >= 6 && $('#haslo_input').val().length <= 20)
    {
        conf_pass2 = true;
        
        if($('#haslo2_input').val() != "" && $('#haslo_input').val() != "")
        {
            var haslo1 = $('#haslo_input').val();
            var haslo2 = $('#haslo2_input').val();

            if(haslo1 == haslo2)
            {
                conf_pass = true;
                $('#haslo_input, #haslo2_input').css({"background-color": "rgba(7, 92, 0, 0.5)"});
                if(conf_pass == true && conf_pass2 == true && conf_captcha == true && conf_login == true && conf_email == true)
                {
                    $('#incorrect_pass_text').fadeOut(200);
                }
            }
            else
            {
                $('#haslo_input, #haslo2_input').css({"background-color": "rgba(111, 0, 0, 0.55)"});
                $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Podane hasła nie są takie same.</b>').fadeIn(300);
                conf_pass = false;
            }
        }
    }
}

conf_login = true;
conf_login2 = true;

function checkLogin()
{   
    var login = $('#login_input').val().length;
    
    if(login > 0 && login < 3 || login > 20)
    {
        conf_login = false;
        $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Login musi mieć od 3 do 20 znaków.</b>').fadeIn(300);
    }
    else if(login > 0)
    {
        conf_login = true;
        checkLogin2();
    }
}

function checkLogin2()
{
    var login2 = $('#login_input').val();
        
    $.post("sprawdzenie_loginu.php", {login_r:login2}, function(result){
        
        if(result == "zajetylogin")
        {
            conf_login2 = false;
            $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Podany login jest już zajęty.</b>').fadeIn(300);
        }
        else if(result == "wolnylogin")
        {
            conf_login2 = true;
            if(conf_pass == true && conf_pass2 == true && conf_captcha == true && conf_login == true && conf_email == true)
            {
                $('#incorrect_pass_text').fadeOut(200);
            }
        }
    });
}

conf_email = true;

function checkEmail()
{
    var email2 = $('#email_input').val();
        
    $.post("sprawdzenie_maila.php", {email:email2}, function(result){
        
        if(result == "zajetymail")
        {
            conf_email = false;
            $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Podany adres email jest już zajęty.</b>').fadeIn(300);
        }
        else if(result == "wolnymail")
        {
            conf_email = true;
            if(conf_pass == true && conf_pass2 == true && conf_captcha == true && conf_login == true && conf_login2 == true && conf_email == true)
            {
                $('#incorrect_pass_text').fadeOut(200);
            }
        }
    });
}

conf_captcha = true;
ifchecked = 0;

function checkCaptcha()
{
    ifchecked++;
    
    var recaptcha = grecaptcha.getResponse();
    
    if(recaptcha.length == 0)
    {
        conf_captcha = false;
        $('#incorrect_pass_text').fadeOut(200).empty().append('<b>Musisz potwierdzić, że nie jesteś robotem.</b>').fadeIn(300);
    }
    else
    {
        conf_captcha = true;
        if(conf_pass == true && conf_pass2 == true && conf_login == true && conf_login2 == true && conf_email == true && conf_captcha == true)
        {
            $('#incorrect_pass_text').fadeOut(200);
        }
    }
}

function runCheckCaptcha()
{
    CaptchaInterval = setInterval(function()
    { 
        checkCaptcha(); 
    }, 2000);
}