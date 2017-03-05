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
        $code = $_POST['conf_code'];
        $user = $_SESSION['user'];
        
        $getcode = $polaczenie -> query("SELECT confirmation_code FROM users WHERE login = '$user'");
        
        $wynik = $getcode -> fetch_assoc();
        
        $kodzbazy = $wynik['confirmation_code'];
        
        if($kodzbazy == $code)
        {
            if($polaczenie -> query("UPDATE users SET is_activated = '1' WHERE login = '$user'"))
            {
                session_unset();
                echo "true"; 
            }
            else
            {
                 echo "bladdodawania";
            }
        }
        else
        {
            echo "false";
        }
              
        $polaczenie->close();
    }

?>