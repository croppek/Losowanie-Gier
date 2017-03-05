<?php

    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    if(isset($_SESSION['zalogowany']))
    { 
        echo '<div id="sklep_saldo">Portfel: <b>' . $_SESSION["money"] . ' wPLN</b></div>
        
        W tym miejscu możesz otworzyć skrzynie z ciekawymi nagrodami!<br/><br/>';
        
        require_once("../connect.php");
    
        $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
        @mysqli_set_charset($polaczenie,"utf8");

        if($polaczenie->connect_errno != 0)
        {  
            echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        }
        else
        {
            if($rezultat = @$polaczenie->query("SELECT * FROM cases ORDER BY id DESC"))
            {
                $ile_skrzyni = $rezultat -> num_rows;

                if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "1")
                { 
                    $admin_things = '<div id="admin_things">| <p class="remove_case_btn">Usuń</p> | <p class="modify_case_btn">Edytuj</p> |</div>';
                    echo '<script src="JS/edit_case.js"></script>';
                }
                else
                {
                    $admin_things = '';  
                }

                if($ile_skrzyni > 0)
                {    
                    while($row = mysqli_fetch_array($rezultat))
                    {
                        echo '<div class="case_container">
                        <div>
                        <img src="' . $row['image'] . '" style="width: 250px; height: 250px; display: block; margin: 0 auto -15px; padding: 0; border-radius: 5px;" />
                        <p class="games_in_case" style="display: none; font-size: 0.9em; height: 250px; padding: 0; margin: 0 auto -15px; overflow-y: auto;">
                        <span style="font-style: italic;">Gry w skrzyni:</span><span style="display: block; margin: 5px 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                        
                        $games_in_case_array = array();
                        
                        $game_percent1 = $row['game_percent1'];
                        $game_percent2 = $row['game_percent2'];
                        $game_percent3 = $row['game_percent3'];
                        $game_percent4 = $row['game_percent4'];
                        $game_percent5 = $row['game_percent5'];
                        $game_percent6 = $row['game_percent6'];
                        $game_percent7 = $row['game_percent7'];
                        $game_percent8 = $row['game_percent8'];
                        $game_percent9 = $row['game_percent9'];
                        $game_percent10 = $row['game_percent10'];
                        
                        if($game_percent1 > 0)
                        {
                            $games_in_case_array[$row['game_name1']] = $game_percent1;
                        }
                        
                        if($game_percent2 > 0)
                        {
                            $games_in_case_array[$row['game_name2']] = $game_percent2;
                        }
                        
                        if($game_percent3 > 0)
                        {
                            $games_in_case_array[$row['game_name3']] = $game_percent3;
                        }
                        
                        if($game_percent4 > 0)
                        {
                            $games_in_case_array[$row['game_name4']] = $game_percent4;
                        }
                        
                        if($game_percent5 > 0)
                        {
                            $games_in_case_array[$row['game_name5']] = $game_percent5;
                        }
                        
                        if($game_percent6 > 0)
                        {
                            $games_in_case_array[$row['game_name6']] = $game_percent6;
                        }
                        
                        if($game_percent7 > 0)
                        {
                            $games_in_case_array[$row['game_name7']] = $game_percent7;
                        }
                        
                        if($game_percent8 > 0)
                        {
                            $games_in_case_array[$row['game_name8']] = $game_percent8;
                        }
                        
                        if($game_percent9 > 0)
                        {
                            $games_in_case_array[$row['game_name9']] = $game_percent9;                        
                        }
                        
                        if($game_percent10 > 0)
                        {
                            $games_in_case_array[$row['game_name10']] = $game_percent10;
                        }
                        
                        asort($games_in_case_array);
                        
                        $arr_len = count($games_in_case_array);
                        
                        $iter = 1;
                        
                        if($arr_len == 2)
                        {
                            $iter = 100;
                            
                            $x1 = 0;
                            $x2 = 100;
                        }
                        else if($arr_len <= 6)
                        {
                            $x1 = 2;
                            $x2 = 3;
                        }
                        else
                        {
                            $x1 = 3;
                            $x2 = 5;
                        }
                        
                        foreach($games_in_case_array as $g_name => $g_percent) 
                        {
                            if($iter > 99 && $g_name != "Nothing")
                            {
                                if($iter == 100)
                                {
                                    echo '<span style="color: rgb(195, 0, 0);"><b>'. $g_name .'</b></span><span style="display: block; margin: 0 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                                }
                                else if($iter > $x2)
                                {
                                    echo '<span style="color: rgb(0, 67, 217);"><b>'. $g_name .'</b></span><span style="display: block; margin: 0 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                                }
                                
                                $iter++;
                            }
                            else if($g_name != "Nothing")
                            {
                                if($iter <= 1)
                                {
                                    echo '<span style="color: rgb(180, 195, 0);"><b>'. $g_name .'</b></span><span style="display: block; margin: 0 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                                }
                                else if($iter > 1 && $iter <= $x1)
                                {
                                    echo '<span style="color: rgb(195, 0, 180);"><b>'. $g_name .'</b></span><span style="display: block; margin: 0 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                                }
                                else if($iter > $x1 && $iter <= $x2)
                                {
                                    echo '<span style="color: rgb(111, 0, 222);"><b>'. $g_name .'</b></span><span style="display: block; margin: 0 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                                }
                                else if($iter > $x2)
                                {
                                    echo '<span style="color: rgb(0, 67, 217);"><b>'. $g_name .'</b></span><span style="display: block; margin: 0 0 -28px 0; padding: 0; height: 2px; border-bottom: 1px solid rgba(255, 255, 255, 0.2);"></span><br/>';
                                }

                                $iter++;
                            }
                                
                        }
                        
                        echo '</p></div> 
                        <br /> ' . $admin_things . '
                        <p id="case_title">' . $row['name'] . '</p>
                        <p id="case_price">Cena: <span id="get_case_price">' . $row['price'] . '</span> wPLN </p>
                        <input type="button" class="login_btn" value="Otwórz" style="width: 200px;" />
                        </div>'; 
                    }
                    echo '<script src="JS/case_settings.js"></script>';
                }
                else
                {
                    echo '<p style="font-size: 1.2em; font-style: italic;">Brak dostępnych skrzyń z grami.</p>';
                }
            }
            else
            {
                echo "Bład połączenia z bazą danych.";
            }
            $polaczenie->close();
        }
    }
    else
    { 
        sleep(0.1);
        echo '<script src="JS/login.js"></script>';
    }

?>