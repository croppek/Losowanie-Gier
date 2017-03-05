<?php
    
    session_start();

    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    $i = 0;

    if(isset($_POST['transporter']))
    {
        $ile = $_POST['transporter'];
    }
    else
    {
        $ile = 3;
    }

    require_once("../connect.php");
    
    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {
        if($rezultat = @$polaczenie->query("SELECT * FROM news ORDER BY data DESC"))
        {
            $ile_newsow = $rezultat -> num_rows;
            
            if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "1")
            { 
                $admin_things = '<div id="admin_things">| <p class="remove_news_btn">Usuń</p> | <p class="modify_news_btn">Edytuj</p> |</div>';
                echo '<script src="JS/edit_news.js"></script>';
            }
            else
            {
                $admin_things = '';  
            }
            
            if($ile_newsow > 0)
            {    
                while($row = mysqli_fetch_array($rezultat))
                {
                    if($i < $ile)
                    {
                        echo '<h1 id="tytul_newsa">'. $row['tytul'] .'</h1>' . $admin_things . '<p id="data_dodania">'. $row['data'] . ' dodał ' . $row['kto'] .'</p><p id="tresc_newsa">'. $row['tresc'] .'</p>';
                        $i++; 
                    }
                }
                
                if($i >= 3 && $ile < $ile_newsow)
                {
                    echo '<p class="login_text" id="more_news_btn">Pokaż więcej</p><script src="JS/more_news.js"></script>';
                }
            }
            else
            {
                echo "Brak aktualności.";
            }
        }
        else
        {
            echo "Bład połączenia z bazą danych.";
        }
        $polaczenie->close();
    }

?>

