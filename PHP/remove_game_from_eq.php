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
        $item_id = $_POST['user_eq_id'];
        $user = $_SESSION['user'];
        
        if(isset($_POST['user_eq_id']))
        {
            if($rezultat = @$polaczenie->query("SELECT * FROM user_eq WHERE id = '$item_id' AND who = '$user'"))
            {
                $ile_wynikow = $rezultat -> num_rows;
                
                if($ile_wynikow > 0)
                {
                    $wiersz = $rezultat -> fetch_assoc();
                    
                    $what = $wiersz['what'];
                    $if_used = $wiersz['used'];
                    
                    if($if_used == 0)
                    {
                        echo 'nieuzytykod';
                    }
                    else if(@$polaczenie->query("DELETE FROM user_eq WHERE id = '$item_id' AND who = '$user'"))
                    {
                        echo 'true';
                    }
                }
                else
                {
                    echo "notineq";
                }
            }
            
        }
        
        $polaczenie->close();
    }
?>