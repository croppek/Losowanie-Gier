<?php
    
    session_start();
    
    require_once("connect.php");

    $winning_game = $_POST['winning_game'];
    $case_price = $_POST['case_price'];
    $kto = $_SESSION['user'];

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {          
        if(isset($_POST['winning_game']))
        {
            if($winning_game == 'Nothing')
            {
                $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$kto'");
                $getmoney = $getmoney -> fetch_assoc();
                $getmoney = $getmoney['money'];

                if($getmoney == "")
                {
                    $getmoney = 0;
                }

                $new_amount = $getmoney - $case_price;
                $new_amount += 0.5;

                if($new_amount >= 0)
                {
                    if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$kto'"))
                    {
                        $_SESSION['money'] = $new_amount;

                        echo 'nic';
                    }
                    else
                    {
                        echo 'bladaktualizacjibazy';
                    }
                }
                else
                {
                    echo 'zamalokasy';
                }
            }
            else
            {
                $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$kto'");
                $getmoney = $getmoney -> fetch_assoc();
                $getmoney = $getmoney['money'];

                if($getmoney == "")
                {
                    $getmoney = 0;
                }

                $new_amount = $getmoney - $case_price;

                if($new_amount >= 0)
                {
                    if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$kto'"))
                    {
                        $_SESSION['money'] = $new_amount;

                        if($polaczenie -> query("INSERT INTO user_eq VALUES(NULL,'$kto','$winning_game','',0)"))
                        {
                            echo 'true';
                        }
                        else
                        {
                            echo 'bladdodawaniadoeq';
                        }
                    }
                    else
                    {
                        echo 'bladaktualizacjibazy';
                    }
                }
                else
                {
                    echo 'zamalokasy';
                }
            }
        }
        else
        {
            echo 'brakgry';
        }
        
        $polaczenie->close();
    }
?>