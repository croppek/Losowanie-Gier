<?php
    
    session_start();
    
    $_GET['refresh'] = "";
    $value = $_GET['refresh'];
    eval($value);

    $sesja = session_id();

    $imie = $_SESSION['name'];
    $nazwisko = $_SESSION['last_name'];

    $ile = $_SESSION['amount'];
    $tax_amount = $ile * 0.025;
    $final_ile = $ile + ceil($tax_amount*100)/100;

    $_SESSION['final_amount'] = $final_ile;

    //crc sandbox - 5f88923b9e6f4081
    //crc secure - 6e24feecd5b648ad

    $ciag = $sesja . "|39386|" . $final_ile*100 . "|PLN|6e24feecd5b648ad";

    $transaction_info = array();

    $transaction_info[] = $sesja;
    $transaction_info[] = $_SESSION['email'];
    $transaction_info[] = $imie . " " . $nazwisko;
    $transaction_info[] = "http://destinyflip.net/confirm_transaction.php";
    $transaction_info[] = md5($ciag);
                
    echo json_encode($transaction_info);

?>