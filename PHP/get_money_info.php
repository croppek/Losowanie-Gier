<?php
    
    session_start();
    
    $price = $_POST['price'];
        
    if(isset($_POST['price']))
    {
        $actual_money = $_SESSION['money'];
        
        if(($actual_money - $price) >= 0)
        {
            echo 'starczy';
        }
        else
        {
            echo 'niestarczy';
        }
    }

?>