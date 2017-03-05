<?php 
    
    session_start();

    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    if(isset($_POST['transporter2']))
    {
        session_regenerate_id();
    }

?>

<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!--
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    -->
	
	<title>DestinyFlip</title>
	
	<meta name="description" content="Lubisz ryzyko i dobrą zabawę? Wierzysz w przeznaczenie? DestinyFlip.net to miejsce dla Ciebie! Rzuć wyzwanie przeznaczeniu i odmień swój los! Zabawa jest na wyciągnięcie ręki, na co czekasz?" />
	<meta name="keywords" content="destiny,flip,random,key,game,gambling,destinyflip" />
	
	<link rel="apple-touch-icon" sizes="180x180" href="/IMG/icons/apple-touch-icon.png">
	<link rel="icon" type="image/png" href="/IMG/icons/favicon-32x32.png" sizes="32x32">
	<link rel="icon" type="image/png" href="/IMG/icons/favicon-16x16.png" sizes="16x16">
	<link rel="manifest" href="/IMG/icons/manifest.json">
	<link rel="mask-icon" href="/IMG/icons/safari-pinned-tab.svg" color="#5bbad5">
	<link rel="shortcut icon" href="/IMG/icons/favicon.ico">
	<meta name="msapplication-config" content="/IMG/icons/browserconfig.xml">
	<meta name="theme-color" content="#ffffff">
	
    <!--<link rel="stylesheet" type="text/css" href="style.css">-->
    <link rel="stylesheet" type="text/css" href="style_min.css">
    <link rel="stylesheet" type="text/css" href="loader-css.css">
    <link href="https://fonts.googleapis.com/css?family=Poiret+One&subset=latin-ext" rel="stylesheet">
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
    <script src="JS/jquery.idle.min.js"></script>
    <script src="JS/jquery.particleground.min.js"></script>
    <script src="JS/velocity.min.js"></script>
    <script src="JS/logout.js"></script>
    <script src="JS/login_expiration.js"></script>
    <script src="JS/chatbox.js"></script>
    <script src="https://www.google.com/recaptcha/api.js?onload=load_recaptcha&render=explicit" async defer></script>
    
    
    <script>
        //Sprawdzanie czy ktoś jest zalogowany, jeśli tak dodanie odpowiednich elementów do menu bocznego
        $(document).ready(function(){
            
            chat_interval = '';
            
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
                    $('#panel_admina_btn').remove();
                    $('#logout_btn').remove();
                    $('#border').remove();
                    $('#border2').remove();
                    $('#zagraj_btn').remove();
                    $('#sklep_btn').remove();
                    
                    $('#chat_box').fadeOut(250);
                    
                    is_admin = false;
                    
                    clearInterval(chat_interval);
                }
                
                $.get('pages/reload_menu.php', { transporter:value }, function(data){ 
                
                    $('#menu_reload').empty().append(data);  
                });
            });
            
        });
        
    </script>
    
</head>

<body>
    
    <div id="chat_box">
        <div id="chat_title">Chat Box</div>
        
        <div id="chat_messages">
            
        </div>
        
        <input type="text" id="chat_msg_input" value="" class="login_text_input" style="border: none; border-radius: 0; width: 220px; height: 20px; margin: 0; font-size: 16px; float: left;" />
        <input type="button" id="send_chat_msg" value="Wyślij" class="login_btn" style="float: left; width: 70px; height: 30px; margin: 0; font-size: 18px; border-radius: 0;" />
            
    </div>
    
    <!-- Tutaj tworzę "chmurkę" z małymi informacjami (np. potwierdzenie sprzedaży) -->
    <div class="cloud" id="mini_info_cloud" style="width: 550px; height: auto; text-align: center; -webkit-box-shadow: 0px 0px 15px 0px rgba(250, 250, 250, 0.75); -moz-box-shadow: 0px 0px 15px 0px rgba(250, 250, 250, 0.75); box-shadow: 0px 0px 15px 0px rgba(250, 250, 250, 0.75);">
        <div class="closeBtn" id="mini_info_close_btn"><b>X</b></div>
        <div id="mini_info_content" style="margin-top: 30px;"></div>
    </div>
    
    <div id="menu">
        
        <div style="display: block; float: left; height: 80%; width: 305px; padding: 0; margin: 0;">
            
            <div id="logo" style="width: 260px; padding: 10px 0 10px;">
                Destiny<b><span style="color: rgba(206, 192, 132, 0.9);">Flip</span></b>
            </div>
            
            <div style="display: block; height: 70%; width: 275px; padding: 0 15px 15px; margin: 0; overflow-y: auto;">

            <ul>
                <li id="aktualnosci_btn" class="active">
                    Aktualności
                </li>
                <li id="panel_klienta_btn">
                    Profil
                </li>
                <li id="nagrody_btn">
                    Nagrody
                </li>
                <li id="kontakt_btn">
                    Kontakt
                </li>
            </ul>
                
            </div>
            
        </div>
        
        <div style="display: block; float: left; height: 20%; width: 305px; padding: 5% 0 0; margin: 0; ">
            
            <p style="display: block; color: rgba(255, 255, 255, 0.5); margin: 0 auto; padding: 0; line-height: 90%; cursor: default;">DestinyFlip &copy 2016 <br /><span style="font-size: 0.7em; border-bottom: 1px solid rgba(255, 255, 255, 0.5); padding-bottom: 15px; margin-bottom: 10px;">Wszelkie prawa zastrzeżone</span><br /><br /><span style="font-size: 0.6em;"><a style="text-decoration: none; color: rgba(255, 255, 255, 0.5);" href="http://destinyflip.net/devcroppek" target="_blank" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255, 255, 255, 0.5)'">Autor:  Bartosz Kropidłowski</a></span></p>
            
        </div>
        
    </div>
        
    <div id="content" rel="aktualnosci">
        
        <!-- CSS Loader from http://tobiasahlin.com -->
        <div id="css-loader" style="display: none;">
            <div class="sk-circle">
                <div class="sk-circle1 sk-child"></div>
                <div class="sk-circle2 sk-child"></div>
                <div class="sk-circle3 sk-child"></div>
                <div class="sk-circle4 sk-child"></div>
                <div class="sk-circle5 sk-child"></div>
                <div class="sk-circle6 sk-child"></div>
                <div class="sk-circle7 sk-child"></div>
                <div class="sk-circle8 sk-child"></div>
                <div class="sk-circle9 sk-child"></div>
                <div class="sk-circle10 sk-child"></div>
                <div class="sk-circle11 sk-child"></div>
                <div class="sk-circle12 sk-child"></div>
            </div>
        </div>
        
        <div id="deep_content">
            <script>
                if($('#content').attr("rel") == "aktualnosci")
                {
                    $.get('pages/aktualnosci.php', function(data) { $('#deep_content').empty().append(data); });
                }
            </script>
        </div>
    </div>
    
    <div style="clear: both;"></div>
    
    <!-- Tutaj tworzę "chmurkę" z informacjami (np. o wylogowaniu) -->
    <div class="cloud" id="info_cloud">
        <div class="closeBtn" id="info_close_btn"><b>X</b></div>
        <div id="logo">Destiny<b><span style="color: rgba(206, 192, 132, 0.9);">Flip</span></b></div>
        <div id="info_cloud_content" style="margin-top: 30px;"></div>
    </div>
    
    <!-- Tutaj tworzę "chmurkę" z losowaniem po otwarciu skrzyni -->
    <div class="cloud" id="open_case_cloud">
        <div class="closeBtn" id="open_case_close_btn"><b>X</b></div>
        <div id="open_case_content"></div>
    </div>
    
    <!-- Tutaj tworzę "chmurkę" :) | Ta jest od logowania i rejestracji -->
    <div class="cloud" id="sign_cloud">
        <div class="closeBtn" id="log_reg_close_btn"><b>X</b></div>
        <div style="clear: both;"></div>
        
        <div id="logo">
            Destiny<b><span style="color: rgba(206, 192, 132, 0.9);">Flip</span></b>
        </div>
        
        <!-- Div z inputami tylko do logowania -->
        <div id="logowanie">
            
            <form method="post">

                <input id="login_field" class="login_text_input" type="text" name="login" placeholder="Login" onfocus="this.placeholder = '' " onblur="this.placeholder='Login'">
                <input id="password_field" class="login_text_input" type="password" name="haslo" placeholder="Hasło" onfocus="this.placeholder = '' " onblur="this.placeholder='Hasło'">
                <div style="display: block; width: 200px; height: 40px; margin: 0 auto;"><p class="login_text" id="no_pass_btn" style="margin-top: -15px; margin-left: -40px; display: block; width: 280px; height: 30px;">Nie pamiętasz hasła?</p></div>
                <input id="login_btn" class="login_btn" name="zaloguj_btn" type="submit" value="Zaloguj">

            </form>
            
            <p class="login_text" id="no_acc_btn">Nie masz konta? Zarejestruj się!</p>
        
        </div>
        
        <div id="after_login" style="display:none;"></div>
        
        <!-- Div z inputami tylko do rejestracji -->
        <div id="rejestracja">
        
            <form method="post">
                
                <!-- Podzieliłem na dwie połowy formularz, żeby zmieścił się w "chmurce" -->
                <div id="left_half">
                    Login: 
                    <input id="login_input" class="registry_text_input" type="text" name="login_r" placeholder="DestinyAdam" onfocus="this.placeholder = '' " onblur="this.placeholder='DestinyAdam' ; checkLogin()" required><br />
                    <div style="clear: both;"></div>

                    Hasło:
                    <input id="haslo_input" class="registry_text_input" type="password" name="haslo_r" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" onfocus="this.placeholder = '' " onblur="this.placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' ; checkPassword()" required><br />
                    <div style="clear: both;"></div>

                    <span style="font-size: 0.7em;">Powtórz hasło:</span>
                    <input id="haslo2_input" class="registry_text_input" type="password" name="haslo_r2" placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" onfocus="this.placeholder = '' " onblur="this.placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;' ; checkPassword()" required><br />
                    <div style="clear: both;"></div>

                    Email:
                    <input id="email_input" class="registry_text_input" type="email" name="email" placeholder="przykladowy@mail.com" onfocus="this.placeholder = '' " onblur="this.placeholder='przykladowy@mail.com' ; checkEmail()" required><br />
                    <div style="clear: both;"></div>
                    
                    Akceptuję <a href="regulamin.pdf" target="_blank"><span style="font-weight: 700;">regulamin</span></a>
                    <input id="checkbox_input" type="checkbox" name="regulamin" required><br />
                    <div style="clear: both;"></div>
                </div>
                
                <div id="right_half">
                    <span style="font-size: 0.8em;">Data urodzenia:</span>
                    <input id="age_input" class="registry_text_input" type="date" size="3" name="birth_date" min="1900-01-01" max="2100-12-31" style="width: 185px" required><br />
                    <div style="clear: both;"></div>

                    Imię:
                    <input id="name_input" class="registry_text_input" type="text" name="name" placeholder="Adam" onfocus="this.placeholder = '' " onblur="this.placeholder='Adam'" required><br />
                    <div style="clear: both;"></div>

                    Nazwisko:
                    <input id="last_name_input" class="registry_text_input" type="text" name="last_name" placeholder="Nowak" onfocus="this.placeholder = '' " onblur="this.placeholder='Nowak'; runCheckCaptcha()" required><br />
                    <div style="clear: both;"></div>
                    
                    Potwierdź, że nie jesteś robtem:
                    <div id="recaptcha1"></div>
                    
                </div>
                <div style="clear: both;"></div>
                    
                    <input id="registry_submit_btn" class="login_btn" name="submit" type="submit" value="Wyślij">
                    <div id="incorrect_pass_text" style="display: none; color: red; font-size: 0.7em; margin: -5px 0 0; padding: 0;"></div>
                    
            </form>
            
        </div>
        <!-- Div z informacjami po przesłaniu formularza rejestracyjnego --> 
        <div id="confirm_account"></div>
        
    </div>
    <div id="bg_blur"></div>
    
    <!-- Specjalny, niewidoczny div z inputem "transportera" dla danych AJAXowych, z funkcją wylogowania użytkowników -->
    <div id="logout_div" style="opacity: 0;">
        <form method="post">
            <input name="transporter" type="hidden">
            <input name="transporter2" type="hidden">
        </form>
        <div id="deep_logout"></div>
    </div>
    
    <!-- Tutaj ładuję ruchome tło -->
	<script src="JS/particleground.js"></script>
    <!-- Obsługa kliknięć w opcje w menu bocznym -->
    <div id="menu_reload">
        <?php
            require("pages/reload_menu.php");
        ?>
    </div>
    <!-- Obsługa rejestracji i logowania -->
    <script src="JS/log_reg.js"></script>
    
    <script>
    
        var recaptcha1;
        
        function load_recaptcha()
        {
            //Render the recaptcha1 on the element with ID "recaptcha1"
            recaptcha1 = grecaptcha.render('recaptcha1', {
                 'sitekey' : '6LdsGwkUAAAAAC0jgcf-A595sSl_q6Xfs5j2Yrul', //Replace this with your Site key
                 'theme' : 'light'
            });
            
        }
        
        setInterval(function(){
   
            var value = 'header("Refresh:0");';

            $.get('im_logged.php', { transporter:value });

        }, 30000);
        
    </script>
    
</body>
</html>