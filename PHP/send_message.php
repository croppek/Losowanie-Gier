<?php

    session_start();
       
    $imieinazwisko = $_POST['kontakt_name'];
    $email = $_POST['kontakt_email'];
    $tresc = $_POST['kontakt_text'];

    if(isset($_POST['kontakt_email']))
    {
        $wszystko_OK = true;

        //Filtrowanie i sprawdzenie poprawności adresu email
        $emailB = filter_var($email, FILTER_SANITIZE_EMAIL);

        if(filter_var($emailB, FILTER_VALIDATE_EMAIL) == false || $emailB != $email)
        {
            $wszystko_OK = false;
            echo "niepoprawnyemail";
            return;
        }

        //Testy walidacyjne przeszły pomyślnie, wkładamy dane do bazy
        if($wszystko_OK == true)
        {
            $dokogo = "support@destinyflip.net";
            $temat = "Wiadomość z formularza kontaktowego.";

            $wiadomosc = '
            <html>
            <head>
                <title>Wiadomość od użytkownika</title>
            </head>
            <body style="text-align: center; background-color: rgba(25, 30, 39, 1); color: #4d4d4d; font-size: 1.2em; padding: 30px;">

                <div style="font-size: 3em; border-bottom: 1px dashed rgba(206, 192, 132, 0.7); padding: 10px; margin-bottom: 20px;">
                    Destiny<b><span style="color: rgba(206, 192, 132, 0.9);">Flip</span></b>
                </div>

                <p>Imię i nazwisko: '. $imieinazwisko .'</p>
                <p>Od kogo: '. $email .'</p>
                <p>Wiadomość: '. $tresc .'</p>
                
                <div style="width: 80%; height: 20px; background-color: rgb(52, 63, 82); margin: 35px auto 0; padding: 20px; display: block; border-radius: 10px;">DestinyFlip © 2016 | Wszelkie prawa zastrzeżone</div>

            </body>
            </html>
            ';
            
            require 'PHPMailerAutoload.php';
            require_once('class.phpmailer.php');    // dodanie klasy phpmailer
            require_once('class.smtp.php');    // dodanie klasy smtp
            
            $mail = new PHPMailer();    //utworzenie nowej klasy phpmailer
            $mail->CharSet="UTF-8";
            $mail->From = "bok@destinyflip.net";    //Pełny adres e-mail
            $mail->FromName = "Formularz kontaktowy DestinyFlip";    //imię i nazwisko lub nazwa użyta do wysyłania wiadomości
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
            
            if($mail->Send())    //sprawdzenie wysłania, jeśli wiadomość została pomyślnie wysłana
            {                      
                echo 'true';
            }            
            else
            {           
                echo 'false';
            }
            
            /*$headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
            $headers .= 'From: <support@destinyflip.net>' . "\r\n";
            
            if(mail($dokogo,$temat,$wiadomosc,$headers))
            {
                echo "true"; 
            }
            else
            {
                echo "false";
            }*/
            
        }
    }
    else
    {
        echo "blad";
    }

?>