<?php

    session_start();

    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);
    
    $login = $_SESSION['user'];

    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");

    //Sprawdzam czy ktoś jest zalogowany i czy jest administratorem
    if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "1")
    { 
        @$polaczenie->query("UPDATE users SET last_seen = NOW() WHERE login = '$login'");
    }
    else if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "")
    { 
        @$polaczenie->query("UPDATE users SET last_seen = NOW() WHERE login = '$login'"); 
    }

    $polaczenie->close();

?>