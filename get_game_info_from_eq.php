<?php

    session_start();
 
    $login = $_SESSION["user"];
    
    $what = $_POST['what'];

    require_once("connect.php");
    
    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");

    if($what == 'id')
    {
        if($rezultat = @$polaczenie->query("SELECT * FROM user_eq WHERE who = '$login' ORDER BY id DESC LIMIT 0,1"))
        {
            $ile_itemow = $rezultat -> num_rows;

            if($ile_itemow > 0)
            {    
                $wiersz = $rezultat -> fetch_assoc();
                
                $id = $wiersz['id'];
                
                echo $id;
            }
        }
    }
    else
    {
        if($rezultat = @$polaczenie->query("SELECT * FROM user_eq WHERE id = '$what'"))
        {
            $ile_itemow = $rezultat -> num_rows;

            if($ile_itemow > 0)
            {    
                $wiersz = $rezultat -> fetch_assoc();
                
                $game_name = $wiersz['what'];
                
                $game_info = @$polaczenie->query("SELECT price FROM games WHERE name = '$game_name'");
                $game_info = $game_info -> fetch_assoc();
                $price = $game_info['price'];
                
                echo $price;
            }
        }
    }
    
    $polaczenie->close();

?>