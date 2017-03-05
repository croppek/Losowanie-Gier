<?php
    
    if(!in_array($_SERVER['REMOTE_ADDR'], explode(',',@file_get_contents('http://microsms.pl/psc/ips/'))) == TRUE)
    {
        exit('Access denied.');
    }
    
    $status = $_POST['status'];
    $user_id = $_POST['userid'];
    //$pay_mail = $_POST['pay_mail'];
    //$pid = $_POST['pid'];
    $control = $_POST['control'];
    $coupon = $_POST['coupon'];
    //$description = $_POST['description'];

    if($user_id == 49 && $status == true)
    {
        /*require_once("connect.php");

        $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
        @mysqli_set_charset($polaczenie,"utf8");

        if($polaczenie->connect_errno == 0)
        {    
            //$ile = $_SESSION['final_amount'];
            
            $getmoney = $polaczenie -> query("SELECT amount FROM transactions WHERE session_id = '$control' AND confirmed IS NULL ORDER BY id ASC LIMIT 1");
            $getmoney = $getmoney -> fetch_assoc();
            $getmoney = $getmoney['amount'];

            $tax_amount = $getmoney * 0.2;
            
            if(($getmoney - $tax_amount) == $coupon)
            {
                if($polaczenie -> query("UPDATE transactions SET confirmed = '1' WHERE session_id = '$control' AND metoda = 'PaySafeCard' AND amount = '$getmoney' AND confirmed IS NULL"))
                {
                    $polaczenie->close();
                    exit('OK');
                }
            }
        }

        $polaczenie->close();*/
        
        if($control == '1234')
        {
            exit('OK');
        }
    }

?>