<?php
    
    session_start();
    
    require_once("connect.php");
    
    if($_SESSION['zalogowany'] == true)
    {
        $polaczenie = @new mysqli($host, $db_user, $db_password, $db_name);
        @mysqli_set_charset($polaczenie,"utf8");

        if($polaczenie->connect_errno != 0)
        {  
            echo 'Błąd połączenia z bazą danych. <br /><br /> <span style="color:#a00000; font-weight:700;"> Numer błędu MySQL: ' . $polaczenie->connect_errno . '</span>';
        }
        else
        {
            $wiadomosc = $_POST['chat_message'];
            
            if($_SESSION['is_admin'] == "1" && isset($_POST['nick_to_ban']))
            {
                $nick = $_POST['nick_to_ban'];
                
                if($polaczenie -> query("UPDATE users SET chat_banned = 1 WHERE login = '$nick'"))
                {
                    echo "true";
                }
            }
            else
            {
                if(isset($_POST['chat_message']) && $wiadomosc != 'brakwiadomosci')
                {
                    $kto = $_SESSION['user'];
                    $kiedy = date("Y-m-d H:i:s");
                    $is_admin = $_SESSION['is_admin'];
                    
                    if($is_admin != "1")
                    {
                        $insert_query = "INSERT INTO chat VALUES(NULL,'$kto','$kiedy','$wiadomosc',NULL)";
                    }
                    else
                    {
                        $insert_query = "INSERT INTO chat VALUES(NULL,'$kto','$kiedy','$wiadomosc','$is_admin')";
                    }
                    
                    $wszystko_OK = true;

                    $check_if_banned = $polaczenie -> query("SELECT chat_banned FROM users WHERE login = '$kto'");
                    $wynik = $check_if_banned -> fetch_assoc();
                    $is_banned = $wynik['chat_banned'];

                    if($is_banned == '1')
                    {
                        $wszystko_OK = false;
                        echo "zbanowany";
                        return;
                    }

                    if($wiadomosc == "")
                    {
                        $wszystko_OK = false;
                        echo "pustawiadomosc";
                        return;
                    }

                    if($kto == "")
                    {
                        $wszystko_OK = false;
                        echo "brakuzytkownika";
                        return;
                    }

                    if($wszystko_OK == true)
                    {
                        if($polaczenie -> query($insert_query))
                        {
                            if($rezultat = @$polaczenie->query("SELECT COUNT(*) as ile_wiadomosci FROM chat"))
                            {
                                $data = mysqli_fetch_assoc($rezultat);
                                if($data['ile_wiadomosci'] > 500)
                                {
                                    @$polaczenie->query("DELETE FROM chat LIMIT 1");
                                }
                            }

                            if($rezultat = @$polaczenie->query("SELECT * FROM chat ORDER BY id DESC LIMIT 100"))
                            {
                                $messages_array = array();

                                while($data = mysqli_fetch_assoc($rezultat))
                                {
                                    $messages_array[] = $data;
                                }

                                echo json_encode($messages_array);
                            }
                        }
                        else
                        {
                            echo "bladdodawania";
                        }
                    }
                }
                else
                {
                    if($rezultat = @$polaczenie->query("SELECT * FROM chat ORDER BY id DESC LIMIT 100"))
                    {
                        $messages_array = array();

                        while($data = mysqli_fetch_assoc($rezultat))
                        {
                            $messages_array[] = $data;
                        }

                        echo json_encode($messages_array);
                    }

                }
            }
            
            $polaczenie->close();
        }
    }
?>