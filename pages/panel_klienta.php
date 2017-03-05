<?php

    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    if(isset($_SESSION['zalogowany']))
    { 
        $email_length = strlen($_SESSION["email"]);
        
        echo '<span style="font-size: 0.9em;">Adres email przypisany do twojego konta: <b><span id="email_adress" style="display: none;">'. $_SESSION["email"] .'</span><span id="email_adress2">'; 
        
        for($len = 0; $len < $email_length; $len++)
        {
            echo '&bull;';
        } 
            
        echo '</span></b> <input type="button" id="pokaz_email_btn" value="Pokaż" style="border-radius: 10px; background-color: rgb(51, 64, 87); color: #fff; outline: none;"></span><br/>
        
        <script>
            
            $("#pokaz_email_btn").click(function(){
                
                $("#pokaz_email_btn").fadeOut(150)
                $("#email_adress2").fadeOut(150, function(){
                
                    $("#email_adress").fadeIn(200);
                
                });
            
            });
        
        </script>
        
        <span class="dashed_border" style="margin-bottom: 15px; margin-top: 15px;"></span>
        
        <span style="font-size: 1.2em;">Kod referencyjny:</span> <br />
        <form>
            <input id="ref_code_input" class="login_text_input" type="text" name="ref_code_input" style="margin-bottom: 25px;" required>
            <input id="add_ref_code_btn" class="login_btn" type="submit" value="Sprawdź kod" style="margin-top: 0px; margin-bottom: 15px;">
        </form>
        <span class="dashed_border" style="margin-bottom: 15px;"></span>
        <script src="JS/ref_code.js"></script>
        
        <span style="font-size: 1.4em;">Stan Twojego portfela: <b>' . $_SESSION["money"] . ' wPLN</b></span><br/>
        
        <input id="add_money_btn" class="login_btn" type="submit" value="Dodaj środki" style="margin-bottom: 15px;">
        <span class="dashed_border" style="margin-bottom: 15px;"></span>
        <script src="JS/add_money.js"></script>
        
        Gry znajdujące się w Twoim ekwipunku: <br/><br/>';
        
        $login = $_SESSION["user"];
        
        require_once("../connect.php");
    
        $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
        @mysqli_set_charset($polaczenie,"utf8");

        if($polaczenie->connect_errno != 0)
        {  
            echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        }
        else
        {
            if($rezultat = @$polaczenie->query("SELECT * FROM user_eq WHERE who = '$login' ORDER BY id DESC"))
            {
                $ile_itemow = $rezultat -> num_rows;

                if($ile_itemow > 0)
                {    
                    while($row = mysqli_fetch_array($rezultat))
                    {
                            $name = $row['what'];
                            $id = $row['id'];
                            $game_key = $row['game_key'];
                            $is_used = $row['used'];
                        
                            $game_info = @$polaczenie->query("SELECT image FROM games WHERE name = '$name'");
                            $game_info = $game_info -> fetch_assoc();
                            $image = $game_info['image'];
                        
                            if($image == '')
                            {
                                $image = 'IMG/no_photo.jpg';
                            }
                            
                            $game_info = @$polaczenie->query("SELECT price FROM games WHERE name = '$name'");
                            $game_info = $game_info -> fetch_assoc();
                            $price = $game_info['price'];
                            
                            if($is_used == 0)
                            {
                                echo '<div class="case_container" id="eq_game'.$id.'" style="min-height: 468.5px; max-height: 490.5px; -webkit-box-shadow: inset 0px 0px 10px 0px rgba(0, 119, 14, 0.9); -moz-box-shadow: inset 0px 0px 10px 0px rgba(0, 119, 14, 0.9); box-shadow: inset 0px 0px 10px 0px rgba(0, 119, 14, 0.9); border: 1px solid rgba(0, 119, 14, 0.9);">';
                            }
                            else
                            {
                                echo '<div class="case_container" id="eq_game'.$id.'" style="min-height: 468.5px; max-height: 490.5px; -webkit-box-shadow: inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9); -moz-box-shadow: inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9); box-shadow: inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9); border: 1px dotted rgba(167, 0, 0, 0.9);">';
                            }
                            echo '<img src="'. $image. '" style="width: 200px; height: 250px; display: block; margin: 0 auto -15px; padding: 0; border-radius: 5px;" />
                            <p style="margin-top: 25px; font-weight: bold; font-size: 0.8em; display: block; height: 28px; overflow-y: auto;">'. $name .'</p>
                            <p style="padding: 0; margin: -5px 0 0 0;"> ~<span id="get_sell_game_price'.$id.'">' . $price . '</span> PLN</p>';
                            
                            echo '<div id="show_game_key_div'.$id.'"><input type="button" class="show_key_btn" value="Pokaż klucz" style="width: 200px;" /></div>
                            
                            <div id="sell_or_remove_btns'.$id.'" class="sellorremovebtns">';
                        
                            if($is_used == 0)
                            {
                                echo '<input type="button" class="sell_game_btn" value="Sprzedaj" style="width: 200px; margin-top: 10px;" />';
                            }
                            else
                            {
                                echo '<input type="button" class="remove_game_btn" value="Usuń" style="width: 200px; margin-top: 10px;" />';
                            }
                        
                            echo '</div></div>';
                            
                    }
                    
                    echo '<script src="JS/user_eq_handling.js"></script>';
                }
                else
                {
                    echo '<p style="font-size: 1.2em; font-style: italic;">Twój ekwipunek jest pusty!</p>';
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