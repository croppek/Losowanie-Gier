<?php
    
    session_start();
    
    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        //echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        echo 'bladpolaczenia';
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
                    
                    if($if_used == 0)
                    {
                        if($rezultat = @$polaczenie->query("SELECT price FROM games WHERE name = '$what'"))
                        {
                            $wiersz = $rezultat -> fetch_assoc();
                            
                            $price = $wiersz['price'];
                            $sell_price = $price / 2;
                            
                            $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$user'");
                            $getmoney = $getmoney -> fetch_assoc();
                            $getmoney = $getmoney['money'];

                            if($getmoney == "")
                            {
                                $getmoney = 0;
                            }

                            $new_amount = $getmoney + $sell_price;
                            
                            if(@$polaczenie->query("DELETE FROM user_eq WHERE id = '$item_id' AND who = '$user'"))
                            {
                                if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$user'"))
                                {
                                    echo $sell_price;

                                    $_SESSION['money'] = $new_amount;
                                }
                                
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