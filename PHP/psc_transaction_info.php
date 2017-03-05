<?php
    
    session_start();
    
    $_GET['refresh'] = "";
    $value = $_GET['refresh'];
    eval($value);

    $userid = 49;
    $pin = '1654769708';
    $control = session_id();

    $email = $_SESSION['email'];

    $ile = $_SESSION['amount'];
    $tax_amount = $ile * 0.25;
    $final_ile = $ile + $tax_amount;

    $_SESSION['final_amount'] = $final_ile;

    $hash = $userid . $pin . $final_ile;

    $transaction_info = array();

    $transaction_info[] = $control;
    $transaction_info[] = $email;
    $transaction_info[] = $pin;
    $transaction_info[] = $userid;
    $transaction_info[] = $final_ile;
    $transaction_info[] = md5($hash);
                
    echo json_encode($transaction_info);

?>