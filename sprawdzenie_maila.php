<?php

    session_start();
    
    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    
    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {
        $email = $_POST['email'];
            
        $rezultat = $polaczenie -> query("SELECT id FROM users WHERE email='$email'");
            
        $ile_maili = $rezultat -> num_rows;
            
        if($ile_maili > 0)
        {
            echo "zajetymail";
            $polaczenie->close();
            return;
        }
        else
        {
            echo "wolnymail";
            $polaczenie->close();
            return;
        }
    }

?>