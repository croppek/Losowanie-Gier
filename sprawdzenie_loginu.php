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
        $login = $_POST['login_r'];
            
        $rezultat = $polaczenie -> query("SELECT id FROM users WHERE login='$login'");
            
        $ile_loginow = $rezultat -> num_rows;
            
        if($ile_loginow > 0)
        {
            echo "zajetylogin";
            $polaczenie->close();
            return;
        }
        else
        {
            echo "wolnylogin";
            $polaczenie->close();
            return;
        }
    }
?>