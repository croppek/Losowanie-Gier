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
        $haslo_nowe = $_POST['zmien_haslo'];
        $haslo_nowe2 = $_POST['zmien_haslo2'];
        $email = $_SESSION['pass_mail'];
        
        if(isset($_POST['zmien_haslo']))
        {
            $wszystko_OK = true;
            
            //Sprawdzenie długości hasła
            if(strlen($haslo_nowe) < 6 || strlen($haslo_nowe) > 20)
            {
                $wszystko_OK = false;
                echo "zladlugoschasla";
                $polaczenie->close();
                return; 
            }
            
            //Sprawdzenie czy podane hasła są takie same
            if($haslo_nowe != $haslo_nowe2)
            {
                $wszystko_OK = false;
                echo "haslaniesatakiesame";
                $polaczenie->close();
                return; 
            }
            
            $haslo_hash = password_hash($haslo_nowe, PASSWORD_DEFAULT);
            
            //Testy walidacyjne przeszły pomyślnie, wkładamy dane do bazy
            if($wszystko_OK == true)
            {
                if($polaczenie -> query("UPDATE users SET password = '$haslo_hash' WHERE email = '$email'"))
                {
                    echo "true"; 
                    session_unset();
                    session_destroy();
                }
                else
                {
                    echo "false";
                } 
                
            }
        }
    }
    $polaczenie->close();

?>