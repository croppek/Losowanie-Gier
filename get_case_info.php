<?php
    
    session_start();
    
    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        //echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        echo 'blad_polaczenia';
    }
    else
    {   
        $title = $_POST['title'];
        $price = $_POST['price'];
        
        if(isset($_POST['title']))
        {   
            if($rezultat = $polaczenie -> query("SELECT game_name1, game_name2, game_name3, game_name4, game_name5, game_name6, game_name7, game_name8, game_name9, game_name10, game_percent1, game_percent2, game_percent3, game_percent4, game_percent5, game_percent6, game_percent7, game_percent8, game_percent9, game_percent10 FROM cases WHERE name = '$title' AND price = '$price'"))
            {
                $games_array = array();
                
                while($data = mysqli_fetch_assoc($rezultat))
                {
                    $games_array[] = $data;
                }
                
                echo json_encode($games_array);
            }
            else
            {
                echo "blad";
            }
        }
        
        $polaczenie->close();
    }
?>