<?php

    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);
    
    //Sprawdzam czy ktoś jest zalogowany i czy jest administratorem
    if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "1")
    { 
        echo "admin";
    }
    else if(isset($_SESSION['zalogowany']) && $_SESSION['is_admin'] == "")
    {   
        echo "zalogowany"; 
    }
    else
    {
        echo "niezalogowany";
    }

?>