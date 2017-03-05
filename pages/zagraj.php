<?php
    
    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    echo "&tritime; Gry są aktualnie w trakcie budowy! &tritime;<br /><br /> Prosimy o cierpliwość i uzupełnianie ekwipunku grami, które można wylosować korzystając ze skrzynek znajdujących się w naszym sklepie. :)<br />";
?>