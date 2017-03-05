<?php

    session_start();

    function checkDateFormat($date)
    {
        //match the format of the date
        if (preg_match("/^([0-9]{4})-([0-9]{2})-([0-9]{2})$/", $date, $parts))
        {
            //check weather the date is valid of not
            if(checkdate($parts[2],$parts[3],$parts[1]))
            {
                return true;
            }
            else
            {
                return false; 
            }
        }
        else
        {
            return false;  
        }
    }

    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {   
        $login_r = $_POST['login_r'];
        $haslo_r = $_POST['haslo_r'];
        $haslo_r2 = $_POST['haslo_r2'];
        $email = $_POST['email'];
        $birth_date = $_POST['birth_date'];
        $name = $_POST['name'];
        $last_name = $_POST['last_name'];
        $recaptcha = $_POST['transporter'];
        
        if(isset($_POST['email']))
        {
            $wszystko_OK = true;
            
            //Sprawdzenie długości loginu
            if(strlen($login_r) < 3 || strlen($login_r) > 20)
            {
                $wszystko_OK = false;
                echo "zladlugoscloginu";
                $polaczenie->close();
                return; 
            }
            
            //Sprawdzenie czy imię składa się tylko z liter
            if(preg_match('/^[a-ząćęłńóśźż]+$/ui', $name) == false)
            {
                $wszystko_OK = false;
                echo "imietylkozliter";
                $polaczenie->close();
                return; 
            }
            
            //Sprawdzenie czy nazwisko składa się tylko z liter
            if(preg_match('/^[a-ząćęłńóśźż]+$/ui', $last_name) == false)
            {
                $wszystko_OK = false;
                echo "nazwiskotylkozliter";
                $polaczenie->close();
                return; 
            }
            
            //Sprawdzenie czy wiek składa się tylko z cyfr
            if(checkDateFormat($birth_date) == false)
            {
                $wszystko_OK = false;
                echo "wiektylkozcyfr";
                $polaczenie->close();
                return; 
            }
            
            //Sprawdzenie czy login składa się tylko z liter i cyfr
            if(ctype_alnum($login_r) == false)
            {
                $wszystko_OK = false;
                echo "logintylkozliterinumerow";
                $polaczenie->close();
                return; 
            }
            
            //Filtrowanie i sprawdzenie poprawności adresu email
            $emailB = filter_var($email, FILTER_SANITIZE_EMAIL);
            
            if(filter_var($emailB, FILTER_VALIDATE_EMAIL) == false || $emailB != $email)
            {
                $wszystko_OK = false;
                echo "niepoprawnyemail";
                $polaczenie->close();
                return;
            }
            
            //Sprawdzenie długości hasła
            if(strlen($haslo_r) < 6 || strlen($haslo_r) > 20)
            {
                $wszystko_OK = false;
                echo "zladlugoschasla";
                $polaczenie->close();
                return; 
            }
            
            //Sprawdzenie czy podane hasła są takie same
            if($haslo_r != $haslo_r2)
            {
                $wszystko_OK = false;
                echo "haslaniesatakiesame";
                $polaczenie->close();
                return; 
            }
            
            $haslo_hash = password_hash($haslo_r, PASSWORD_DEFAULT);
            
            //Sprawdzenie czy reCaptcha została potwierdzona
            $sekret = "6LdsGwkUAAAAAETMbSR4YumKAoWCfmWPXy9njDIv";
            
            $sprawdz = file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$sekret.'&response='.$recaptcha);
            
            $odpowiedz = json_decode($sprawdz);
        
            if($odpowiedz->success == false)
            {
                $wszystko_OK = false;
                echo "potwierdzcaptche";
                $polaczenie->close();
                return;
            }
            
            //Sprawdzenie czy podany email jest już zajęty
            $rezultat = $polaczenie -> query("SELECT id FROM users WHERE email='$email'");
            
            $ile_maili = $rezultat->num_rows;
            
            if($ile_maili > 0)
            {
                $wszystko_OK = false;
                echo "zajetymail";
                $polaczenie->close();
                return;
            }
            
            //Sprawdzenie czy podany login jest już zajęty
            $rezultat = $polaczenie -> query("SELECT id FROM users WHERE login='$login_r'");
            
            $ile_loginow = $rezultat->num_rows;
            
            if($ile_loginow > 0)
            {
                $wszystko_OK = false;
                echo "zajetylogin";
                $polaczenie->close();
                return;
            }
            
            //Testy walidacyjne przeszły pomyślnie, wkładamy dane do bazy
            if($wszystko_OK == true)
            {
                $znaki = 'ACEFHJKM58NPRTUVWXY4937';

                $kod = '';

                for ($i = 0; $i < 6; $i++) 
                {
                    $kod .= $znaki[rand(0, strlen($znaki) - 1)];
                }
                
                if($polaczenie -> query("INSERT INTO users VALUES(NULL,'$login_r','$haslo_hash','$email','$birth_date','$name','$last_name',NULL,NULL,'$kod',NULL,'0',NULL,NULL)"))
                {
                    $dokogo = $email;
                    $temat = "Kod aktywacyjny dla konta w serwisie DestinyFlip.";
                    
                    $wiadomosc = '
                    <html>
                    <head>
                        <title>Aktywuj swoje konto!</title>
                    </head>
                    <body style="text-align: center; background-color: rgba(25, 30, 39, 1); color: #fff; font-size: 1.2em; padding: 30px;">

                        <div style="font-size: 3em; border-bottom: 1px dashed rgba(206, 192, 132, 0.7); padding: 10px; margin-bottom: 20px;">
                            Destiny<b><span style="color: rgba(206, 192, 132, 0.9);">Flip</span></b>
                        </div>

                        <p>Kod aktywacyjny dla użytkownika ' . $login_r . ' to:</p>
                        <p style="padding: 20px; display: block; width: 150px; margin: 0 auto; border: 3px solid rgba(206, 192, 132, 0.7); border-radius: 10px; background-color: rgba(96, 96, 96, 0.88); font-size: 2em; "> ' . $kod . '</p>
                        
                        <div style="width: 80%; height: 20px; background-color: rgb(52, 63, 82); margin: 35px auto 0; padding: 20px; display: block; border-radius: 10px;">DestinyFlip © 2016 | Wszelkie prawa zastrzeżone</div>

                    </body>
                    </html>
                    ';
                    
                    require 'PHPMailerAutoload.php';
                    require_once('class.phpmailer.php');    // dodanie klasy phpmailer
                    require_once('class.smtp.php');    // dodanie klasy smtp

                    $mail = new PHPMailer();    //utworzenie nowej klasy phpmailer
                    $mail->CharSet="UTF-8";
                    $mail->From = "no-reply@destinyflip.net";    //Pełny adres e-mail
                    $mail->FromName = "No-reply DestinyFlip";    //imię i nazwisko lub nazwa użyta do wysyłania wiadomości
                    $mail->Host = "s06.emailserver.pl";    //adres serwera SMTP wysyłającego e-mail
                    $mail->Mailer = "smtp";    //do wysłania zostanie użyty serwer SMTP
                    $mail->SMTPAuth = true;    //włączenie autoryzacji do serwera SMTP
                    $mail->Username = "support@destinyflip.com.pl";    //nazwa użytkownika do skrzynki e-mail
					$mail->Password = "SuperHaslo123@";    //hasło użytkownika do skrzynki e-mail
                    $mail->Port = 587; //port serwera SMTP 
                    $mail->Subject = $temat;    //Temat wiadomości, można stosować zmienne i znaczniki HTML
                    //$mail->Body = $wiadomosc;    //Treść wiadomości, można stosować zmienne i znaczniki HTML
                    $mail->MsgHTML($wiadomosc);
                    $mail->SMTPAutoTLS = false;   //wyłączenie TLS
                    $mail->SMTPSecure = '';    // 
                    $mail->AddAddress ($dokogo);    //adres skrzynki e-mail oraz nazwa adresata, do którego trafi wiadomość

                    $mail->Send();
                    
                    $_SESSION['user'] = $login_r;
                    echo "true";
                    
                    /*$headers = "MIME-Version: 1.0" . "\r\n";
                    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                    $headers .= 'From: <no-reply@destinyflip.net>' . "\r\n";
                    
                    mail($dokogo,$temat,$wiadomosc,$headers);*/
                }
                else
                {
                    echo "bladdodawania";
                }
                
                $polaczenie->close();
            }
        }
    }

?>