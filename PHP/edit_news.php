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
        $conf = $_POST['transporter'];
        $title = $_POST['transporter2'];
        $date = $_POST['date'];
        
        if(isset($_POST['transporter']))
        {   
            if($conf == "remove")
            {
                if($polaczenie -> query("DELETE FROM news WHERE tytul = '$title' AND data = '$date'"))
                {
                    echo "removed";
                }
                else
                {
                    echo "blad";
                }
            }
        }
        $polaczenie->close();
    }
?>