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
        $amount = $_POST['money_amount'];
        $method = $_POST['payment_method'];
        
        if($method == 'Przelew')
        {
            $tax_amount = $amount * 0.025;
            $final_amount = $amount + ceil($tax_amount*100)/100;
        }
        else if($method == 'PaySafeCard')
        {
            $tax_amount = $amount * 0.25;
            $final_amount = $amount + $tax_amount;
        }
        
        $session_id = session_id();
        $kto = $_SESSION['user'];
        $kiedy = date("Y-m-d");
        
        if(isset($_POST['money_amount']))
        {
            $wszystko_OK = true;
            
            if($amount == "")
            {
                $wszystko_OK = false;
                echo "pustakwota";
                return;
            }
            
            if($session_id == "")
            {
                $wszystko_OK = false;
                echo "bladsesji";
                return;
            }
            
            if($kto == "")
            {
                $wszystko_OK = false;
                echo "brakuzytkownika";
                return;
            }
            
            if($wszystko_OK == true)
            {
                if($polaczenie -> query("INSERT INTO transactions VALUES(NULL,'$session_id','$final_amount','$kto','$kiedy','$method',NULL)"))
                {
                    echo "true";
                    $session_id = '';
                    $_SESSION['amount'] = $amount;
                }
                else
                {
                    echo "bladdodawania";
                    $session_id = '';
                }
            }
        }
        $polaczenie->close();
    }
?>