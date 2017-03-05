<?php

    $i = 0;
        
    $session_id = '';
    $amount = '';
    $order_id = '';
    $pos_id = '';
    $method = '';
    $statement = '';
    $currency = '';
    $sign = '';

    foreach ($_POST as $key => $value)
    {
        if($i == 0)
        {
            $session_id .= htmlspecialchars($value);
        }

        if($i == 1)
        {
            $amount .= htmlspecialchars($value);
        }

        if($i == 2)
        {
            $order_id .= htmlspecialchars($value);
        }

        if($i == 3)
        {
            $pos_id .= htmlspecialchars($value);
        }

        if($i == 4)
        {
            $merchant_id .= htmlspecialchars($value);
        }

        if($i == 5)
        {
            $method .= htmlspecialchars($value);
        }

        if($i == 6)
        {
            $statement .= htmlspecialchars($value);
        }

        if($i == 7)
        {
            $currency .= htmlspecialchars($value);
        }

        if($i == 8)
        {
            $sign .= htmlspecialchars($value);
        }

        $i++;
    }
    
    //$new_session = session_id();

    //if($new_session == $session_id)
    //{

        $c = curl_init();

        curl_setopt($c,CURLOPT_URL,'https://secure.przelewy24.pl/trnVerify');
        curl_setopt($c,CURLOPT_POST,1);
        curl_setopt($c,CURLOPT_RETURNTRANSFER,1);
        curl_setopt($c,CURLOPT_POSTFIELDS,'p24_merchant_id='.$merchant_id.'&p24_pos_id='.$pos_id.'&p24_session_id='.$session_id.'&p24_amount='.$amount.'&p24_currency='.$currency.'&p24_order_id='.$order_id.'&p24_sign='.$sign);

        $ans = curl_exec($c);

        curl_close($c);

        if($ans == "error=0")
        {
            require_once("connect.php");

            $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
            @mysqli_set_charset($polaczenie,"utf8");

            if($polaczenie->connect_errno != 0)
            {  
                echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
            }
            else
            {   
                $ile = $amount / 100;
                
                if($polaczenie -> query("UPDATE transactions SET confirmed = '1' WHERE session_id = '$session_id' AND amount = '$ile' AND confirmed IS NULL"))
                {
                    echo "Transakcja została prawidłowo potwierdzona.";
                }
                else
                {
                    echo "Wystąpił błąd podczas zapisywania danych, w celu dodania środków do portfela skontaktuj się z administracją serwisu.";
                }
            }
            
            $polaczenie->close();
        }
    //}

?>