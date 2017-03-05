<?php
    $key = ''; // KLUCZ PRYWATNY, HOMEPAY > PANEL PARTNERA > PAYSAFECARD > USTAWIENIA
    $data = array(
        'uid' => 0, // IDENTYFIKATOR UŻYTKOWNIKA HOMEPAY
        'public_key' => '', // KLUCZ PUBLICZNY, HOMEPAY > PANEL PARTNERA > PAYSAFECARD > USTAWIENIA
        'amount' => (1 * 100), // KWOTA W GROSZACH
        'label' => '', // ETYKIETA PŁATNOSCI, np. ADRES.PL
        'control' => '', // UNIKALNY IDENTYFIKATOR DLA PŁATNOCI NADAWANY PRZEZ PARTNERA
        'success_url' => urlencode(''), // LINK NA KTÓRY ZOSTANIE PRZEKIEROWANY KLIENT PRZY POMYSLNEJ PŁATNOSCI
        'failure_url' => urlencode(''), // LINK NA KTÓRY ZOSTANIE PRZEKIEROWANY KLIENT W PRZYPADKU BŁĘDU W PŁATNOSCI
        'notify_url' => urlencode('') // LINK NA KTÓRY ZOSTANIE WYSŁANE POWIADOMIENIE API O DOKONANEJ PŁATNOSCI
    );
    $data['crc'] = md5(join('', $data) . $key);

    echo '<form method="post" name="paysafecard" action="https://ssl.homepay.pl/paysafecard/">';

    foreach($data as $field => $value)
    {
        echo '<input type="hidden" name="' . $field . '" value="' . $value . '">';
    }

    echo '</form>
    <p>Za chwile zostaniesz przekierowany do strony wpłaty.</p>
    <p>Jeśli przekierowanie nie nastąpi w ciągu kilku sekund, kliknij <a href="#" onclick="document.paysafecard.submit(); return false;">tutaj</a>.</p>
    <script>setTimeout(function() { document.paysafecard.submit(); }, 2000);</script>';
?>