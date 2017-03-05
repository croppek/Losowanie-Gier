<?php
    
    session_start();
    
    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        //echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        echo "blad_polaczenia";
    }
    else
    {   
        $item_id = $_POST['user_eq_id'];
        $user = $_SESSION['user'];
        
        if(isset($_POST['user_eq_id']))
        {
            if($rezultat = @$polaczenie->query("SELECT * FROM user_eq WHERE id = '$item_id' AND who = '$user'"))
            {
                $ile_wynikow = $rezultat -> num_rows;
                
                if($ile_wynikow > 0)
                {
                    $wiersz = $rezultat -> fetch_assoc();
                    
                    $what = $wiersz['what'];
                    $if_used = $wiersz['used'];
                    $game_key = $wiersz['game_key'];
                    
                    if($game_key != '' && strlen($game_key) > 2)
                    {
                        echo $game_key;
                    }
                    else if($if_used == 0)
                    {
                        if($rezultat = @$polaczenie->query("SELECT * FROM transactions WHERE kto = '$user' AND confirmed = 1"))
                        {
                            $ile_transakcji = $rezultat -> num_rows;

                            if($ile_transakcji > 0)
                            {
                                $orderby = rand(1,2);
                        
                                if($orderby == 1)
                                {
                                    $zapytanie = "SELECT * FROM game_keys WHERE game = '$what' ORDER BY id ASC";
                                }
                                else
                                {
                                    $zapytanie = "SELECT * FROM game_keys WHERE game = '$what' ORDER BY id DESC";
                                }

                                if($rezultat = @$polaczenie->query($zapytanie));
                                {
                                    $ile_kluczy = $rezultat -> num_rows;

                                    if($ile_kluczy > 0)
                                    {
                                        $wiersz = $rezultat -> fetch_assoc();

                                        $key_id = $wiersz['id'];
                                        $game_key = $wiersz['game_key'];

                                        if($game_key != '')
                                        {
                                            if(@$polaczenie->query("DELETE FROM game_keys WHERE id = '$key_id'"))
                                            {
                                                if(@$polaczenie->query("UPDATE user_eq SET used = '1' WHERE id = '$item_id'"))
                                                {
                                                    if(@$polaczenie->query("UPDATE user_eq SET game_key = '$game_key' WHERE id = '$item_id'"))
                                                    {
                                                        echo $game_key;    
                                                    }    
                                                }
                                            }
                                        }
                                        else
                                        {
                                            echo "bladodczytu";
                                        }
                                    }
                                    else
                                    {
                                        echo "brakkluczy";
                                    }
                                }
                            }
                            else
                            {
                                echo "dodajsrodki";
                            }
                        }
                    }
                }
                else
                {
                    echo "notineq";
                }
            }
            
        }
        
        $polaczenie->close();
    }
?>