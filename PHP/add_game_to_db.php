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
        $game_title = $_POST['add_game_title'];
        $game_image = $_POST['add_game_image'];
        $game_price = $_POST['add_game_price'];
        
        if(isset($_POST['add_game_title']))
        {
            $wszystko_OK = true;
            
            if($game_title == "")
            {
                $wszystko_OK = false;
                echo "pustanazwa";
                return;
            }
            
            if($rezultat = $polaczenie -> query("SELECT name FROM games WHERE name = '$game_title'"))
            {
                $ile_gier = $rezultat -> num_rows;
            
                if($ile_gier > 0)
                {
                    $wszystko_OK = false;
                    echo "zajetanazwa";
                    return;
                }
            }
            
            if($game_price == '')
            {
                $wszystko_OK = false;
                echo "pustacena";
                return;
            }
            
            if($game_price <= 0)
            {
                $wszystko_OK = false;
                echo "zlacena";
                return;
            }
            
            if($game_image == "")
            {
                $wszystko_OK = false;
                echo "pustagrafika";
                return;
            }
            
            if($wszystko_OK == true)
            {
                if($polaczenie -> query("INSERT INTO games VALUES(NULL,'$game_title','$game_image','$game_price')"))
                {
                    echo "true";
                }
                else
                {
                    echo "bladdodawania";
                }
            }
        }
        $polaczenie->close();
    }
?>