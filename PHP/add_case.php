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
        $case_name = $_POST['nazwa_skrzyni_input'];
        $case_price = $_POST['cena_skrzyni_input'];
        $case_image = $_POST['grafika_skrzyni_input'];
        
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
        
        $game_percent1 = $_POST['game_percent1'];
        $game_percent2 = $_POST['game_percent2'];
        $game_percent3 = $_POST['game_percent3'];
        $game_percent4 = $_POST['game_percent4'];
        $game_percent5 = $_POST['game_percent5'];
        $game_percent6 = $_POST['game_percent6'];
        $game_percent7 = $_POST['game_percent7'];
        $game_percent8 = $_POST['game_percent8'];
        $game_percent9 = $_POST['game_percent9'];
        $game_percent10 = $_POST['game_percent10'];
        
        if(isset($_POST['nazwa_skrzyni_input']))
        {
            $wszystko_OK = true;
            
            if($case_name == "")
            {
                $wszystko_OK = false;
                echo "pustanazwa";
                return;
            }
            
            if($rezultat = $polaczenie -> query("SELECT name FROM cases WHERE name = '$case_name'"))
            {
                $ile_gier = $rezultat -> num_rows;
            
                if($ile_gier > 0)
                {
                    $wszystko_OK = false;
                    echo "zajetanazwa";
                    return;
                }
            }
            
            if($case_price == "")
            {
                $wszystko_OK = false;
                echo "pustacena";
                return;
            }
            
            if($case_price <= 0)
            {
                $wszystko_OK = false;
                echo "zlacena";
                return;
            }
            
            if($case_image == "")
            {
                $wszystko_OK = false;
                echo "pustagrafika";
                return;
            }
            
            if($wszystko_OK == true)
            {
                if($polaczenie -> query("INSERT INTO cases VALUES(NULL,'$case_name','$case_price','$case_image','$game_name1','$game_name2','$game_name3','$game_name4','$game_name5','$game_name6','$game_name7','$game_name8','$game_name9','$game_name10','$game_percent1','$game_percent2','$game_percent3','$game_percent4','$game_percent5','$game_percent6','$game_percent7','$game_percent8','$game_percent9','$game_percent10')"))
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