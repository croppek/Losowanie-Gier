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
        $game_name1 = $_POST['game_name1'];
        $game_name2 = $_POST['game_name2'];
        $game_name3 = $_POST['game_name3'];
        $game_name4 = $_POST['game_name4'];
        $game_name5 = $_POST['game_name5'];
        $game_name6 = $_POST['game_name6'];
        $game_name7 = $_POST['game_name7'];
        $game_name8 = $_POST['game_name8'];
        $game_name9 = $_POST['game_name9'];
        $game_name10 = $_POST['game_name10'];
        
        $game_names = array($game_name1, $game_name2, $game_name3, $game_name4, $game_name5, $game_name6, $game_name7, $game_name8, $game_name9, $game_name10);
        
        if(isset($_POST['game_name1']) || isset($_POST['game_name2']) || isset($_POST['game_name3']) || isset($_POST['game_name4']) || isset($_POST['game_name5']) || isset($_POST['game_name6']) || isset($_POST['game_name7']) || isset($_POST['game_name8']) || isset($_POST['game_name9']) || isset($_POST['game_name10']))
        {
            $game_images_array = array();
            
            for($i = 0; $i < 10; $i++)
            {
                $game_name = $game_names[$i];

                if($game_name == '')
                {
                    $game_images_array[] = 'empty';
                }
                else if($rezultat = $polaczenie -> query("SELECT image FROM games WHERE name = '$game_name'"))
                {
                    while($data = mysqli_fetch_assoc($rezultat))
                    {
                        $game_images_array[] = $data;
                    }
                }
                
            }
            
            echo json_encode($game_images_array);
            
        }
        
        $polaczenie->close();
    }
?> 