<?php

    session_start();

?>

<!DOCTYPE HTML>
<html lang="pl">
<head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <!--
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
    -->
    <link rel="stylesheet" type="text/css" href="style.css">
    <link href="https://fonts.googleapis.com/css?family=Poiret+One&subset=latin-ext" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
	
	<title>Potwierdzenie transakcji</title>
    
</head>
<body style="text-align: center; padding-top: 25px; overflow: auto;">
        
    <?php

        sleep(3);

        require_once("connect.php");

        $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
        @mysqli_set_charset($polaczenie,"utf8");

        if($polaczenie->connect_errno != 0)
        {  
            echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        }
        else
        {
            if(isset($_SESSION['amount']) && isset($_SESSION['user']))
            {
                $ile = $_SESSION['amount'];
                $final_ile = $_SESSION['final_amount'];
                $kto = $_SESSION['user'];
                $session_id = session_id();

                $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$kto'");
                $getmoney = $getmoney -> fetch_assoc();
                $getmoney = $getmoney['money'];

                if($getmoney == "")
                {
                    $getmoney = 0;
                }

                $new_amount = $getmoney + $ile;
                
                $getconfirm = $polaczenie -> query("SELECT confirmed FROM transactions WHERE session_id = '$session_id' AND amount = '$final_ile' AND kto = '$kto'");
                $getconfirm = $getconfirm -> fetch_assoc();
                $getconfirm = $getconfirm['confirmed'];
                
                if($getconfirm == "1")
                {
                    if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$kto'"))
                    {
                        echo 'Transakcja przebiegła pomyślnie, Twój portfel został doładowany o: ' . $ile . ' wPLN. :)<br /> <button class="login_btn" style="width: 400px;"><a href="http://destinyflip.net" style="color: rgb(57, 72, 98); text-decoration: none;">Powrót do strony głównej</a></button>';
                        
                        $_SESSION['money'] = $new_amount;
                    }
                }
                else
                {     
                    echo 'Wystąpił błąd podczas zapisywania danych, w celu dodania środków do portfela skontaktuj się z administracją serwisu.<br /> <button class="login_btn" style="width: 400px;"><a href="http://destinyflip.net" style="color: rgb(57, 72, 98); text-decoration: none;">Powrót do strony głównej</a></button>';
                }

            }
            else
            {
                echo 'Twoja sesja wygasła, w celu dodania środków do portfela skontaktuj się z administracją serwisu.<br /> <button class="login_btn" style="width: 400px;"><a href="http://destinyflip.net" style="color: rgb(57, 72, 98); text-decoration: none;">Powrót do strony głównej</a></button>';
            }
            $polaczenie->close();
        }
    ?>
    
</body>
</html>
