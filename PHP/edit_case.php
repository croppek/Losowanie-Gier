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
        $price = $_POST['price_transporter'];
        
        if(isset($_POST['transporter']))
        {   
            if($conf == "remove")
            {
                if($polaczenie -> query("DELETE FROM cases WHERE name = '$title' AND price = '$price'"))
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