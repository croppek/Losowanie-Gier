<?php

    session_start();

	error_reporting(E_ALL);

	ini_set('error_reporting', E_ALL);
	ini_set("display_errors", 1);

    $sms_number = $_POST['sms_number'];

    //if($sms_number == 7055) $add_amount = 0.23;
    if($sms_number == 7136) $add_amount = 0.45;
    else if($sms_number == 7255) $add_amount = 0.90;
    else if($sms_number == 7355) $add_amount = 1.35;
    else if($sms_number == 7455) $add_amount = 1.80;
    else if($sms_number == 7555) $add_amount = 2.25;
    else if($sms_number == 7636) $add_amount = 2.70;
    else if($sms_number == 77464) $add_amount = 3.15;
    else if($sms_number == 78464) $add_amount = 3.60;
    else if($sms_number == 7936) $add_amount = 4.05;
    else if($sms_number == 91055) $add_amount = 4.50;
    else if($sms_number == 91155) $add_amount = 4.95;
    else if($sms_number == 91455) $add_amount = 6.30;
    else if($sms_number == 91664) $add_amount = 7.20;
    else if($sms_number == 91955) $add_amount = 8.55;
    else if($sms_number == 92055) $add_amount = 9.00;
    else if($sms_number == 92555) $add_amount = 11.25;
    else $add_amount = 0;

	$settings = array(
		/* 
			@nazwa:	userid
			@opis: numer identyfikacyjny partnera nadawany po zarejestrowaniu konta (dostępny po zalogowaniu).
		*/
		'userid' => '49',
		/*
			@nazwa: serviceid
			@opis: numer identyfikacyjny kanału SKS dostępny w sekcji "Kanały SMS Premium" 
		*/
		'serviceid' => '1904',
		/*
			@nazwa: text
			@opis: treść wiadomości, która zostaje zainicjowana przez partnera w panelu. Pamiętaj, że błąd powoduje nierozliczenie płatności!
		*/
		'text' => 'MSMS.DESTINY',
		/*
			@nazwa: number
			@opis: numer z gamy zainicjowanych w panelu partnera
		*/
		'number' => $sms_number
		);
		
	/* 
		Weryfikujemy, czy formularz został wysłany
	*/
	if (isset($_POST['sms_code_input'])) {
		
		$code = addslashes($_POST['sms_code_input']);
		
		/* 
			Weryfikujemy poprawność kodu
		*/
		if (preg_match("/^[A-Za-z0-9]{8}$/", $code)) {
			/*
				Łączymy się z serwerem MicroSMS
			*/
			$api = @file_get_contents("http://microsms.pl/api/v2/index.php?userid=" . $settings['userid'] . "&number=" . $settings['number'] . "&code=" . $code . '&serviceid=' . $settings['serviceid']);

			/* 
				Jeśli wystąpi problem z połączeniem, skrypt wyświetli błąd.
			*/
			if (!isset($api)) {
				//$errormsg = 'Nie można nawiązać połączenia z serwerem płatności.';
				echo 'bladpolaczeniazserwerem';
			} else {
				/*
					Dekodujemy odpowiedź serwera do formatu json
				*/
				$api = json_decode($api);
			
				/* 
					Sprawdzamy czy odpowiedź na pewno jest w formacie json
				*/
				if (!is_object($api)) {
					//$errormsg = 'Nie można odczytać informacji o płatności.';
					echo 'niemoznaodczytacinfo';
				} 
				
			}
			
			if (isset($api->connect) && $api->connect == TRUE) {
				/*
					Jeśli kod jest prawidłowy, wydajemy produkt
				*/
				if ($api->data->status == 1) {
					
					// Tutaj możesz również wykonywać inne operacje
					// Np. dodać zapytanie mysql, wysłać maila itp.
                    
                    $session_id = session_id();
                    $kiedy = date("Y-m-d");
                    
                    require_once("connect.php");

                    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
                    @mysqli_set_charset($polaczenie,"utf8");

                    if($polaczenie->connect_errno != 0)
                    {  
                        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
                    }
                    else
                    {   
                        if($add_amount == 0)
                        {
                            echo 'bladodczytukwoty';
                            return;
                        }
                        
                        $kto = $_SESSION['user'];

                        $getmoney = $polaczenie -> query("SELECT money FROM users WHERE login = '$kto'");
                        $getmoney = $getmoney -> fetch_assoc();
                        $getmoney = $getmoney['money'];

                        if($getmoney == "")
                        {
                            $getmoney = 0;
                        }

                        $new_amount = $getmoney + $add_amount;

                        if($add_amount != 0 && $kto != "")
                        {
                            if($polaczenie -> query("UPDATE users SET money = '$new_amount' WHERE login = '$kto'"))
                            {
                                if($polaczenie -> query("INSERT INTO transactions VALUES(NULL,'$session_id','$add_amount','$kto','$kiedy','SMS','1')"))
                                {
                                    echo 'true';

                                    $_SESSION['money'] = $new_amount; 
                                }     
                            }
                        }
                    }
                    $polaczenie->close();
                    
					
				} else {
					//$errormsg = 'Przesłany kod jest nieprawidłowy, spróbuj ponownie.';
					echo 'nieprawidlowykod';
				}
			}

		} else {
			//$errormsg = 'Przesłany kod jest nieprawidłowy, przepisz go ponownie.';
			echo 'zlykod';
		}
	}

?>