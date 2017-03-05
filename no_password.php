<?php

    session_start();
    
    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {  
        $email = $_POST['check_email'];
        
        if($rezultat = @$polaczenie->query("SELECT * FROM users WHERE email='$email'"))
        {
            $ilu_userow = $rezultat -> num_rows;

            if($ilu_userow > 0)
            {
                $znaki = 'ACEFHJKM58NPRTUVWXY4937';

                $kod = '';

                for ($i = 0; $i < 6; $i++) 
                {
                    $kod .= $znaki[rand(0, strlen($znaki) - 1)];
                }
                
                $_SESSION['kod'] = $kod;
                $_SESSION['pass_mail'] = $email;
                
                $dokogo = $email;
                $temat = "Kod potwierdzający dla konta w serwisie DestinyFlip.";

                $wiadomosc = '
                <html>
                <head>
                    <title>Zresetuj swoje hasło.</title>
                </head>
                <body style="text-align: center; background-color: rgba(25, 30, 39, 1); color: #fff; font-size: 1.2em; padding: 30px;">

                    <div style="font-size: 3em; border-bottom: 1px dashed rgba(206, 192, 132, 0.7); padding: 10px; margin-bottom: 20px;">
                        Destiny<b><span style="color: rgba(206, 192, 132, 0.9);">Flip</span></b>
                    </div>

                    <p>Twój kod potwierdzający to:</p>
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
                
                echo "ok";
                
                /*$headers = "MIME-Version: 1.0" . "\r\n";
                $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
                $headers .= 'From: <no-reply@destinyflip.net>' . "\r\n";

                mail($dokogo,$temat,$wiadomosc,$headers);*/
                
            }
            else
            {
                echo "brakkont";
            }
        }
              
        $polaczenie->close();
    }

?>