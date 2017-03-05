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
        $code = $_POST['conf_pass_code'];
        
        $kodzmaila = $_SESSION['kod'];
        
        if($kodzmaila == $code)
        {
            echo "true";
        }
        else
        {
            echo "false";
        }
              
        $polaczenie->close();
    }

?>