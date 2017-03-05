<?php
    
    session_start();
    
    require_once("connect.php");

    $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
    @mysqli_set_charset($polaczenie,"utf8");
    
    if($polaczenie->connect_errno != 0)
    {  
        echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
    }
    else
    {   
        $tytul = $_POST['tytul_newsa'];
        $data = $_POST['data_newsa'];
        $tresc = $_POST['tresc_newsa'];
        $kto = $_SESSION['user'];
        
        if(isset($_POST['tytul_newsa']))
        {
            $wszystko_OK = true;
            
            if($tytul == "")
            {
                $wszystko_OK = false;
                echo "pustytytul";
                return;
            }
            
            if($data == "")
            {
                $wszystko_OK = false;
                echo "pustadata";
                return;
            }
            
            if($tresc == "")
            {
                $wszystko_OK = false;
                echo "pustatresc";
                return;
            }
            
            if($wszystko_OK == true)
            {
                if($polaczenie -> query("INSERT INTO news VALUES(NULL,'$tytul','$data','$tresc', '$kto')"))
                {
                    echo "true";
                }
                else
                {
                    echo "bladdodawania";
                }
            }
        }
        $polaczenie->close();
    }
?>