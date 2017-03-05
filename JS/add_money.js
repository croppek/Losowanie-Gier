$(document).ready(function(){
   
    $("#add_money_btn").unbind('click');
    $('#add_money_btn').click(function(){
        
        var value = 'header("Refresh:0");';
        $.get('transaction_info.php', { refresh:value });
        
        $('#menu, #content').fadeOut(300, function(){
            
            $('#info_cloud_content').empty().append('<div style="display: block; text-align: center;">Wybierz sposób płatności:<br/><br/><div id="sms_method_btn" class="pay_method_div" title="SMS"><img src="IMG/sms_method.png" style="width: 180px; height: 180px; opacity: 0.8;"/></div><div id="transfer_method_btn" class="pay_method_div" title="Przelew bankowy"><img src="IMG/transfer_method.png" style="width: 180px; height: 180px; opacity: 0.8;"/></div><div id="psc_method_btn" class="pay_method_div" title="PaySafeCard"><img src="IMG/psc_method.png" style="width: 180px; height: 100px; margin-top: 40px;"/></div></div>');
            
            $("#psc_method_btn").hover(function(){
                $(this).css("opacity", "0.7");
                }, function(){
                $(this).css("opacity", "1");
            });
            
            $('#bg_blur').fadeIn(300,function(){
                
                $('#info_cloud').fadeIn(300); 
                
            });
            
            $("#transfer_method_btn").unbind('click');
            $('#transfer_method_btn').click(function(){
                
                $('#info_cloud_content').fadeOut(250, function(){
                    
                    $(this).empty().append('<div style="display: block; text-align: center;">Podaj kwotę (wPLN) jaką chcesz doładować swój portfel: <form id="add_money_amount_form"><input id="amount_money_input" class="login_text_input" type="number" min="1" max="10000" name="money_amount" value="5" style="width: 150px;" required><input id="continue_money_btn" class="login_btn" name="money_continue" type="submit" value="Dalej"></form></div>').fadeIn(250);
                    
                    $("#continue_money_btn").unbind('click');
                    $('#continue_money_btn').click(function(){
                        
                        $('#add_money_amount_form').submit(false);

                        var am_input = $('#amount_money_input').val();

                        if(am_input != "" && Math.floor(am_input) == am_input && am_input >= 1 && am_input <= 10000)
                        {
                            var amount = $('#amount_money_input').val();
                            var method = 'Przelew';

                            $.post("add_money.php", { money_amount:amount, payment_method:method }, function(result){

                                var session_id = 'default';
                                var email_tr = 'default';
                                var sign = 'default';
                                var first_last_name = 'default';
                                var return_url = 'default';

                                if(result == "true")
                                {
                                    $.post("transaction_info.php", { give_info:'true' }, function(result){

                                        var transaction_info = JSON.parse(result);

                                        session_id = transaction_info[0];
                                        email_tr = transaction_info[1];
                                        first_last_name = transaction_info[2];
                                        return_url = transaction_info[3];
                                        sign = transaction_info[4];

                                        var tax_amount = amount*0.025;
                                        var final_amount = parseFloat(amount) + (Math.ceil(tax_amount*100)/100);
                                        var form_final_amount = final_amount*100;
                                        
                                        form_final_amount = Math.round(form_final_amount * 100) / 100;
                                        
                                        $('#info_cloud_content').fadeOut(350, function(){

                                            $(this).empty().append('<div style="display: block; text-align: center;">Potwierdź dane zamówienia:<br/><br/><b>Kwota doładowania:</b> '+ amount +' wPLN <br/><b>Koszt przelewu (+ prowizja operatora):</b> '+ final_amount +' PLN <br/><b>Email:</b> '+ email_tr +'<br/> <b>Imię i nazwisko:</b> '+ first_last_name +'<br/><form action="https://secure.przelewy24.pl/trnDirect" method="post"><input type="hidden" name="p24_session_id" value="'+ session_id +'" /><input type="hidden" name="p24_merchant_id" value="39386" /><input type="hidden" name="p24_pos_id" value="39386" /><input type="hidden" name="p24_amount" value="'+ form_final_amount +'" /><input type="hidden" name="p24_currency" value="PLN" /><input type="hidden" name="p24_description" value="Doładowanie wirtualnego portfela w serwisie DestinyFlip" /><input type="hidden" name="p24_client" value="'+ first_last_name +'" /><input type="hidden" name="p24_country" value="PL" /><input type="hidden" name="p24_email" value="'+ email_tr +'" /><input type="hidden" name="p24_language" value="pl" /><input type="hidden" name="p24_url_return" value="'+ return_url +'" /><input type="hidden" name="p24_url_status" value="http://destinyflip.net/status.php" /><input type="hidden" name="p24_api_version" value="3.2" /><input type="hidden" name="p24_encoding" value="UTF-8" /><input type="hidden" name="p24_sign" value="'+ sign +'" /><br /><input id="p24_form_send" name="submit_send" value="Potwierdzam" type="submit" class="login_btn"/></form></div>').fadeIn(350);
                                        
                                        });

                                    });

                                }
                                else if(result == "bladdodawania")
                                {
                                    alert("Wystąpił błąd podczas zapisywania danych! Spróbuj ponownie!");
                                }
                                else if(result == "pustakwota")
                                {
                                    alert("Pole z kwotą nie może być puste!");
                                }
                                else if(result == "bladsesji")
                                {
                                    alert("Wystąpił bład sesji! Spróbuj ponownie!");
                                }
                                else if(result == "brakuzytkownika")
                                {
                                    alert("Twoja sesja wygasła, zaloguj się ponownie!");
                                }

                            });
                        } 
                    });
                });
                    
            });
            
            $("#sms_method_btn").unbind('click');
            $('#sms_method_btn').click(function(){
                
                var option_value;
                
                function sms_checkout_content()
                {
                    $('#info_cloud_content').fadeOut(250, function(){

                        $(this).empty().append('<div style="display: block; text-align: center;">Wybierz kwotę doładowania:<br/><form><select id="lista_doladowan_sms" class="login_text_input" style="font-size: 1em; width: 90%; height: 50px; margin: 10px auto 0; padding: 5px;"><option value="0.45">Doładowanie 0.45 wPLN (koszt SMS z VAT - 1.23zł)</option><option value="0.90">Doładowanie 0.90 wPLN (koszt SMS z VAT - 2.46zł)</option><option value="1.35">Doładowanie 1.35 wPLN (koszt SMS z VAT - 3.69zł)</option><option value="1.80">Doładowanie 1.80 wPLN (koszt SMS z VAT - 4.92zł)</option><option value="2.25">Doładowanie 2.25 wPLN (koszt SMS z VAT - 6.15zł)</option><option value="2.70">Doładowanie 2.70 wPLN (koszt SMS z VAT - 7.38zł)</option><option value="3.15">Doładowanie 3.15 wPLN (koszt SMS z VAT - 8.61zł)</option><option value="3.60">Doładowanie 3.60 wPLN (koszt SMS z VAT - 9.84zł)</option><option value="4.05">Doładowanie 4.05 wPLN (koszt SMS z VAT - 11.07zł)</option><option value="4.50">Doładowanie 4.50 wPLN (koszt SMS z VAT - 12.30zł)</option><option value="4.95">Doładowanie 4.95 wPLN (koszt SMS z VAT - 13.53zł)</option><option value="6.30">Doładowanie 6.30 wPLN (koszt SMS z VAT - 17.22zł)</option><option value="7.20">Doładowanie 7.20 wPLN (koszt SMS z VAT - 19.68zł)</option><option value="8.55">Doładowanie 8.55 wPLN (koszt SMS z VAT - 23.37zł)</option><option value="9.00">Doładowanie 9.00 wPLN (koszt SMS z VAT - 24.60zł)</option><option value="11.25">Doładowanie 11.25 wPLN (koszt SMS z VAT - 30.75zł)</option></select></div><div id="sms_form_div" style="margin-top: 20px;"></div>').fadeIn(250);

                        $('#sms_form_div').append('Wyślij SMS o treści <b>MSMS.DESTINY</b> na numer: <br/> <span style="margin-top: 10px; font-size: 1.8em; font-weight: bold; letter-spacing: 4px;">7136</span><form id="sms_code_form7136"><input id="sms_code_input" class="login_text_input" type="text" name="sms_code_input" style="width: 250px;" placeholder="Kod z SMS" required><input id="continue_sms_code_btn7136" class="login_btn" type="submit" value="Prześlij kod"></form>');

                        var sms_number = 7136;
                        option_value = 0.45;

                        $('#lista_doladowan_sms').change(function(){

                            $('#sms_form_div').fadeOut(250,function(){

                                option_value = $('#lista_doladowan_sms').val();

                                //if(option_value == 0.23) sms_number = 7055;
                                if(option_value == 0.45) sms_number = 7136;
                                else if(option_value == 0.90) sms_number = 7255;
                                else if(option_value == 1.35) sms_number = 7355;
                                else if(option_value == 1.80) sms_number = 7455;
                                else if(option_value == 2.25) sms_number = 7555;
                                else if(option_value == 2.70) sms_number = 7636;
                                else if(option_value == 3.15) sms_number = 77464;
                                else if(option_value == 3.60) sms_number = 78464;
                                else if(option_value == 4.05) sms_number = 7936;
                                else if(option_value == 4.50) sms_number = 91055;
                                else if(option_value == 4.95) sms_number = 91155;
                                else if(option_value == 6.30) sms_number = 91455;
                                else if(option_value == 7.20) sms_number = 91664;
                                else if(option_value == 8.55) sms_number = 91955;
                                else if(option_value == 9.00) sms_number = 92055;
                                else if(option_value == 11.25) sms_number = 92555;

                                $(this).empty().append('Wyślij SMS o treści <b>MSMS.DESTINY</b> na numer: <br/><span style="margin-top: 10px; font-size: 1.8em; font-weight: bold; letter-spacing: 4px;">' + sms_number + '</span><form id="sms_code_form'+sms_number+'"><input id="sms_code_input" class="login_text_input" type="text" name="sms_code_input" style="width: 250px;" placeholder="Kod z SMS" required><input id="continue_sms_code_btn'+sms_number+'" class="login_btn" type="submit" value="Prześlij kod"></form>').fadeIn(500);

                                $('#sms_code_form'+sms_number+' input[type="text"]').focus(function(){
                                    $(this).attr('placeholder',''); 
                                });

                                $('#sms_code_form'+sms_number+' input[type="text"]').blur(function(){
                                    if($(this).val() == '')
                                    {
                                        $(this).attr('placeholder','Kod z SMS');   
                                    }
                                });

                                $('#continue_sms_code_btn'+sms_number).unbind('click');
                                $('#continue_sms_code_btn'+sms_number).click(function(){

                                    $('#sms_code_form'+sms_number).submit(false);

                                    var code_value = $(this).prev().val();

                                    sms_continue_btn_click(code_value,sms_number);

                                });

                            });

                        });

                        $('#sms_code_form'+sms_number+' input[type="text"]').focus(function(){
                            $(this).attr('placeholder',''); 
                        });

                        $('#sms_code_form'+sms_number+' input[type="text"]').blur(function(){
                            if($(this).val() == '')
                            {
                                $(this).attr('placeholder','Kod z SMS');   
                            }
                        });

                        $('#continue_sms_code_btn'+sms_number).unbind('click');
                        $('#continue_sms_code_btn'+sms_number).click(function(){

                            $('#sms_code_form'+sms_number).submit(false);

                            var code_value = $(this).prev().val();

                            sms_continue_btn_click(code_value,sms_number);

                        });
                    });
                }
                
                sms_checkout_content();

                function sms_continue_btn_click(code_value,elem_number)
                {
                    var working = false;
                    
                    if(working == false)
                    {
                        working = true;
                        
                        if(code_value != '')
                        {
                            $.post("send_sms_code.php", { sms_code_input:code_value, sms_number:elem_number }, function(result){

                                //if(result == 'bladpolaczeniazserwerem')
                                if(result == 'bladpolaczeniazserwerem')
                                {
                                    $('#info_cloud_content').fadeOut(250,function(){

                                        $(this).empty().append('Nie można nawiązać połączenia z serwerem płatności.<br/><br/><input id="sms_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);

                                        $('#sms_goback_btn').unbind('click');
                                        $('#sms_goback_btn').click(function(){

                                            sms_checkout_content();

                                        });

                                    });
                                }
                                else if(result == 'niemoznaodczytacinfo')
                                {
                                    $('#info_cloud_content').fadeOut(250,function(){

                                        $(this).empty().append('Nie można odczytać informacji o płatności.<br/><br/><input id="sms_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);

                                        $('#sms_goback_btn').unbind('click');
                                        $('#sms_goback_btn').click(function(){

                                            sms_checkout_content();

                                        });

                                    });
                                }
                                else if(result == 'bladodczytukwoty')
                                {
                                    $('#info_cloud_content').fadeOut(250,function(){

                                        $(this).empty().append('Błąd odczytu kwoty doładowania.<br/><br/><input id="sms_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);

                                        $('#sms_goback_btn').unbind('click');
                                        $('#sms_goback_btn').click(function(){

                                            sms_checkout_content();

                                        });

                                    });
                                }
                                else if(result == 'nieprawidlowykod')
                                {
                                    $('#info_cloud_content').fadeOut(250,function(){

                                        $(this).empty().append('Przesłany kod jest nieprawidłowy.<br/><br/><input id="sms_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);

                                        $('#sms_goback_btn').unbind('click');
                                        $('#sms_goback_btn').click(function(){

                                            sms_checkout_content();

                                        });

                                    });
                                }
                                else if(result == 'zlykod')
                                {
                                    $('#info_cloud_content').fadeOut(250,function(){

                                        $(this).empty().append('Przesłany kod jest nieprawidłowy, przepisz go ponownie.<br/><br/><input id="sms_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">').fadeIn(500);

                                        $('#sms_goback_btn').unbind('click');
                                        $('#sms_goback_btn').click(function(){

                                            sms_checkout_content();

                                        });

                                    });
                                }
                                else if(result == 'true')
                                {
                                    $('#info_cloud_content').fadeOut(250,function(){

                                        $(this).empty().append('Dziękujemy za skorzystanie z usługi. :) <br/><br/> Twoje konto zostało doładowane o: <b>' + option_value + ' wPLN</b>.').fadeIn(500);

                                        var value = 'header("Refresh:0");';

                                        $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 

                                            $('#deep_content').empty().append(data).delay(100).fadeIn(200);  
                                        });

                                    });
                                }
                                else
                                {
                                    alert(result + '<br/><br/><input id="sms_goback_btn" class="login_btn" type="button" value="Spróbuj ponownie">');

                                    $('#sms_goback_btn').unbind('click');
                                    $('#sms_goback_btn').click(function(){

                                        sms_checkout_content();

                                    });
                                }

                            });
                        }
                        
                        setTimeout(function(){
                            send_clicked = false;
                        }, 2000);
                    }
                }
                    
            });
            
            $("#psc_method_btn").unbind('click');
            $('#psc_method_btn').click(function(){
                
                $('#info_cloud_content').fadeOut(250, function(){
                    
                    $(this).empty().append('<div style="display: block; text-align: center;"><h3 style="color: red; font-weight: bold;">Płatność PSC w trakcie testów... Prosimy o nie korzystanie z niej oraz wybór alternatywnych sposobów płatności. :)</h3><br />Podaj kwotę (wPLN) jaką chcesz doładować swój portfel: <form id="add_money_amount_form"><input id="psc_amount_money_input" class="login_text_input" type="number" min="1" max="10000" name="money_amount" value="5" style="width: 150px;" required><input id="psc_continue_money_btn" class="login_btn" name="money_continue" type="submit" value="Dalej"></form></div>').fadeIn(250);
                    
                    $("#psc_continue_money_btn").unbind('click');
                    $('#psc_continue_money_btn').click(function(){
                        
                        $('#add_money_amount_form').submit(false);

                        var am_input = $('#psc_amount_money_input').val();

                        if(am_input != "" && Math.floor(am_input) == am_input && am_input >= 1 && am_input <= 10000)
                        {
                            var amount = $('#psc_amount_money_input').val();
                            var method = 'PaySafeCard';

                            $.post("add_money.php", { money_amount:amount, payment_method:method }, function(result){

                                var control = 'default';
                                var user_id = 'default';
                                var pin = 'default';
                                var final_amount = 'default';
                                var email = 'default';
                                var hash = 'default';

                                if(result == "true")
                                {
                                    $.post("psc_transaction_info.php", { give_info:'true' }, function(result){

                                        var transaction_info = JSON.parse(result);

                                        control = transaction_info[0];
                                        email = transaction_info[1];
                                        pin = transaction_info[2];
                                        user_id = transaction_info[3];
                                        final_amount = transaction_info[4];
                                        hash = transaction_info[5];
                                        
                                        $('#info_cloud_content').fadeOut(350, function(){

                                            $(this).empty().append('<div style="display: block; text-align: center;">Potwierdź dane zamówienia:<br/><br/><b>Kwota doładowania:</b> '+ amount +' wPLN <br/><b>Koszt doładowania (+ prowizja operatora):</b> '+ final_amount +' PLN <br/><b>Email:</b> '+ email +'<br/><form  action="http://microsms.pl/paysafecard/pay/" method="post"><input type="hidden" name="userid" value="'+ user_id +'" /><input type="hidden" name="hash" value="'+ hash +'" /><input type="hidden" name="description" value="Doładowanie konta w serwisie DestinyFlip.net" /><input type="hidden" name="control" value="'+ control +'" /><input type="hidden" name="amount" value="'+ final_amount +'" /><input type="hidden" name="email" value="'+ email +'" /><input type="hidden" name="return_ok" value="http://destinyflip.net/confirm_transaction.php" /><input type="hidden" name="return_fail" value="http://destinyflip.net/confirm_transaction.php" /><input type="hidden" name="url" value="http://destinyflip.net/psc_status.php" /><input id="psc_form_send" name="submit_send" value="Potwierdzam" type="submit" class="login_btn" /></form></div>').fadeIn(350);
                                        
                                        });

                                    });

                                }
                                else if(result == "bladdodawania")
                                {
                                    alert("Wystąpił błąd podczas zapisywania danych! Spróbuj ponownie!");
                                }
                                else if(result == "pustakwota")
                                {
                                    alert("Pole z kwotą nie może być puste!");
                                }
                                else if(result == "bladsesji")
                                {
                                    alert("Wystąpił bład sesji! Spróbuj ponownie!");
                                }
                                else if(result == "brakuzytkownika")
                                {
                                    alert("Twoja sesja wygasła, zaloguj się ponownie!");
                                }

                            });
                        } 
                    });
                });
            });
            
        });
    });
});