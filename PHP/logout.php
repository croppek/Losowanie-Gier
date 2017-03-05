<?php 
        
    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    $login = $_SESSION['user'];

    require_once("connect.php");
    
    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno == 0)
    {  
        //Usuwanie sesji
        session_unset();

        session_destroy();

        session_regenerate_id(); 
    }

?>