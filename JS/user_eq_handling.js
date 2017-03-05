$(document).ready(function(){
    
    var item_id = '';
   
    $(".show_key_btn").unbind('click');
    $('.show_key_btn').click(function(){
        
        item_id = $(this).parent().parent().attr('id');
        item_id = item_id.substr(7);
        
        if($('#eq_game'+item_id).css('border-style') == 'dotted' || $('#eq_game'+item_id).css('border-top-style') == 'dotted')
        {
            $.post("get_game_key.php", {user_eq_id:item_id}, function(result){

                if(result == "blad_polaczenia") 
                {
                    $('#bg_blur').fadeIn(300, function(){
                                           
                        $('#mini_info_content').empty().append("Wystąpił błąd podczas łączenia z bazą danych! Spróbuj ponownie.");

                        $('#mini_info_cloud').fadeIn(350);

                    });
                }
                else if(result == "bladodczytu")
                {
                    $('#bg_blur').fadeIn(300, function(){
                                           
                        $('#mini_info_content').empty().append("Wystąpił błąd podczas odczytu klucza z bazy danych! Spróbuj ponownie.");

                        $('#mini_info_cloud').fadeIn(350);

                    });
                }
                else if(result == "brakkluczy")
                {
                    $('#bg_blur').fadeIn(300, function(){
                                           
                        $('#mini_info_content').empty().append("Aktualnie brak kluczy w bazie danych! <br /> Proszę spróbować ponownie później lub skontaktować się z administracją.");

                        $('#mini_info_cloud').fadeIn(350);

                    });
                }
                else if(result == "notineq")
                {
                    $('#bg_blur').fadeIn(300, function(){
                                           
                        $('#mini_info_content').empty().append("Wygląda na to, że wybrana gra nie znajduję się już w Twoim ekwipunku.. Skontaktuj się z administracją!");

                        $('#mini_info_cloud').fadeIn(350);

                    });
                }
                else if(result == "dodajsrodki")
                {
                    $('#bg_blur').fadeIn(300, function(){
                                           
                        $('#mini_info_content').empty().append("Aby otrzymać klucz musisz aktywować konto dokonując dowolnej wpłaty do swojego portfela.");

                        $('#mini_info_cloud').fadeIn(350);

                    });
                }
                else
                {
                    $('#eq_game'+item_id).css({'border': '1px dotted rgba(167, 0, 0, 0.9)', 'box-shadow': 'inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9)', '-moz-box-shadow': 'inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9)', '-webkit-box-shadow': 'inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9)', 'height': '468.5px'});

                    $('#show_game_key_div'+item_id).fadeOut(250, function(){

                        $(this).empty().append('<input type="text" class="login_text_input" value="'+result+'" style="width: 260px; margin: 15px auto 10px; overflow-x: auto; font-size: 13px;" disabled="disabled" />').fadeIn(250);

                    });
                }

            });
        }
        else
        {
            $('#bg_blur').fadeIn(300, function(){
                
                $('#mini_info_content').empty().append('Czy na pewno chcesz zobaczyć klucz do gry? <br />Stracisz możliwość sprzedania jej.<br /><br /><div style="display: block; margin: 0 auto; width: 460px; heigth: 100px;"><div class="login_btn" id="info_yes_btn" style="margin-right: 100px; width: 150px; font-size: 1.6em; float: left;">TAK</div><div class="login_btn" id="info_no_btn" style="width: 150px; float: left; font-size: 1.6em;">NIE</div></div>');
                
                $('#mini_info_cloud').fadeIn(350);
                    
                    var info_yes_clicked = false;
                    $("#info_yes_btn").unbind('click');
                    $('#info_yes_btn').click(function(){
                        
                        if(info_yes_clicked == false)
                        {
                            info_yes_clicked = true;
                            
                            $('#mini_info_cloud').fadeOut(300, function(){
                                $('#bg_blur').fadeOut(200, function(){

                                    $.post("get_game_key.php", {user_eq_id:item_id}, function(result){

                                        if(result == "blad_polaczenia") 
                                        {
                                            $('#bg_blur').fadeIn(300, function(){

                                                $('#mini_info_content').empty().append('Wystąpił błąd podczas łączenia z bazą danych! Spróbuj ponownie.');

                                                $('#mini_info_cloud').fadeIn(350);

                                            });
                                        }
                                        else if(result == "bladodczytu")
                                        {
                                            $('#bg_blur').fadeIn(300, function(){

                                                $('#mini_info_content').empty().append('Wystąpił błąd podczas odczytu klucza z bazy danych! Spróbuj ponownie.');

                                                $('#mini_info_cloud').fadeIn(350);

                                            });
                                        }
                                        else if(result == "brakkluczy")
                                        {
                                            $('#bg_blur').fadeIn(300, function(){

                                                $('#mini_info_content').empty().append('Aktualnie brak kluczy w bazie danych! <br/><br/>Proszę spróbować ponownie później lub skontaktować się z administracją.');

                                                $('#mini_info_cloud').fadeIn(350);

                                            });
                                        }
                                        else if(result == "notineq")
                                        {
                                            $('#bg_blur').fadeIn(300, function(){

                                                $('#mini_info_content').empty().append('Wygląda na to, że wybrana gra nie znajduję się już w Twoim ekwipunku.. Skontaktuj się z administracją!');

                                                $('#mini_info_cloud').fadeIn(350);

                                            });
                                        }
                                        else if(result == "dodajsrodki")
                                        {
                                            $('#bg_blur').fadeIn(300, function(){

                                                $('#mini_info_content').empty().append("Aby otrzymać klucz musisz aktywować konto dokonując dowolnej wpłaty do swojego portfela.");

                                                $('#mini_info_cloud').fadeIn(350);

                                            });
                                        }
                                        else
                                        {
                                            $('#eq_game'+item_id).css({'border': '1px dotted rgba(167, 0, 0, 0.9)', 'box-shadow': 'inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9)', '-moz-box-shadow': 'inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9)', '-webkit-box-shadow': 'inset 0px 0px 10px 0px rgba(167, 0, 0, 0.9)', 'height': '468.5px'});

                                            $('#sell_or_remove_btns'+item_id).fadeOut(250, function(){

                                                $(this).empty().append('<input type="button" class="remove_game_btn" value="Usuń" style="width: 200px; margin-top: 10px;" />').fadeIn(250);

                                            });

                                            $('#show_game_key_div'+item_id).fadeOut(250, function(){

                                                $(this).empty().append('<input type="text" class="login_text_input" value="'+result+'" style="width: 260px; margin: 15px auto 10px; overflow-x: auto; font-size: 13px;" disabled="disabled" />').fadeIn(250);

                                            });
                                        }
                                        
                                        setTimeout(function(){
                                            info_yes_clicked = false;
                                        }, 2000);
                                        
                                    });
                                });
                            });
                        }
                    });
                
                $("#info_no_btn").unbind('click');
                $('#info_no_btn').click(function(){
                    
                    $('#mini_info_cloud').fadeOut(350, function(){
                        $('#bg_blur').fadeOut(200);
                    });
                    
                });

            });
        }
        
    });
    
    $(".sell_game_btn").unbind('click');
    $('.sell_game_btn').click(function(){
        
        item_id = $(this).parent().parent().attr('id');
        item_id = item_id.substr(7);
        
        var game_sell_val = $(this).parent().prev().prev().children('#get_sell_game_price'+item_id).text();
        game_sell_val = game_sell_val / 2;
        
        $('#bg_blur').fadeIn(300, function(){
                
                $('#mini_info_content').empty().append('Czy chcesz sprzedać grę za 50% jej wartości?<br/> Twój portfel zostanie doładowany o: <b>'+game_sell_val+' wPLN</b>.<br /><br /><div style="display: block; margin: 0 auto; width: 460px; heigth: 100px;"><div class="login_btn" id="info_yes_btn" style="margin-right: 100px; width: 150px; font-size: 1.6em; float: left;">TAK</div><div class="login_btn" id="info_no_btn" style="width: 150px; float: left; font-size: 1.6em;">NIE</div></div>');
                
                $('#mini_info_cloud').fadeIn(350);
                
                var info_yes_clicked = false;
                $("#info_yes_btn").unbind('click');
                $('#info_yes_btn').click(function(){
                    
                    if(info_yes_clicked == false)
                    {
                        info_yes_clicked = true;
                        
                        $.post("sell_game_from_eq.php", {user_eq_id:item_id}, function(result){

                            if(result == "bladpolaczenia") 
                            {
                                $('#bg_blur').fadeIn(300, function(){

                                    $('#mini_info_content').empty().append("Wystąpił błąd podczas łączenia z bazą danych! Spróbuj ponownie.");

                                    $('#mini_info_cloud').fadeIn(350);

                                });
                            }
                            else if(result == "notineq")
                            {
                                $('#bg_blur').fadeIn(300, function(){

                                    $('#mini_info_content').empty().append("Wygląda na to, że wybrana gra nie znajduję się już w Twoim ekwipunku.. Skontaktuj się z administracją!");

                                    $('#mini_info_cloud').fadeIn(350);

                                });
                            }
                            else
                            {
                                $('#mini_info_cloud').fadeOut(300, function(){

                                    var value = 'header("Refresh:0");';

                                    $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 

                                        $('#deep_content').empty().append(data);

                                        setTimeout(function(){

                                                $('#mini_info_content').empty().append('Do Twojego portfela dodano: <b>'+ result +' wPLN</b>.');

                                                $('#mini_info_cloud').fadeIn(350);

                                        }, 500);

                                    });

                                });
                            }
                            
                            setTimeout(function(){
                                info_yes_clicked = false;
                            }, 2000);

                        });
                    }

                });
                
                $("#info_no_btn").unbind('click');
                $('#info_no_btn').click(function(){
                    
                    $('#mini_info_cloud').fadeOut(350, function(){
                        $('#bg_blur').fadeOut(200);
                    });
                    
                });
            
        });
        
    });
    
    $(".remove_game_btn").unbind('click');
    $('.remove_game_btn').click(function(){
        
        item_id = $(this).parent().parent().attr('id');
        item_id = item_id.substr(7);
        
        $('#bg_blur').fadeIn(300, function(){
                
            $('#mini_info_content').empty().append('Czy na pewno chcesz usunąć grę z ekwipunku?<br/><br/> Nie bierzemy odpowiedzialności za usunięcie nieaktywowanego klucza do gry.<br /><br /><div style="display: block; margin: 0 auto; width: 460px; heigth: 100px;"><div class="login_btn" id="info_yes_btn" style="margin-right: 100px; width: 150px; font-size: 1.6em; float: left;">TAK</div><div class="login_btn" id="info_no_btn" style="width: 150px; float: left; font-size: 1.6em;">NIE</div></div>');

            $('#mini_info_cloud').fadeIn(350);

            var info_yes_clicked = false;
            $("#info_yes_btn").unbind('click');
            $('#info_yes_btn').click(function(){

                if(info_yes_clicked == false)
                {
                    info_yes_clicked = true;

                    $.post("remove_game_from_eq.php", {user_eq_id:item_id}, function(result){

                        if(result == "nieuzytykod") 
                        {
                            $('#bg_blur').fadeIn(300, function(){

                                $('#mini_info_content').empty().append("Nie użyłeś jeszcze klucza do gry! Upewnij się, że gra została aktywowana zanim usuniesz ją z ekwipunku.");

                                $('#mini_info_cloud').fadeIn(350);

                            });
                        }
                        else if(result == "notineq")
                        {
                            $('#bg_blur').fadeIn(300, function(){

                                $('#mini_info_content').empty().append("Wygląda na to, że wybrana gra nie znajduję się już w Twoim ekwipunku.. Skontaktuj się z administracją!");

                                $('#mini_info_cloud').fadeIn(350);

                            });
                        }
                        else if(result == "true")
                        {
                            $('#mini_info_cloud').fadeOut(300, function(){

                                $('#bg_blur').fadeOut(200, function(){

                                    var value = 'header("Refresh:0");';

                                    $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 

                                        $('#deep_content').empty().append(data);

                                    });

                                });

                            });
                        }
                        else
                        {
                            $('#bg_blur').fadeIn(300, function(){

                                $('#mini_info_content').empty().append(result);

                                $('#mini_info_cloud').fadeIn(350);

                            });
                        }

                        setTimeout(function(){
                            info_yes_clicked = false;
                        }, 2000);

                    });
                }

            });

            $("#info_no_btn").unbind('click');
            $('#info_no_btn').click(function(){

                $('#mini_info_cloud').fadeOut(350, function(){
                    $('#bg_blur').fadeOut(200);
                });

            });
        });
        
    });
    
    $('.sellorremovebtns').on('click', '.remove_game_btn', function(){
        
        item_id = $(this).parent().parent().attr('id');
        item_id = item_id.substr(7);
        
        $('#bg_blur').fadeIn(300, function(){
                
            $('#mini_info_content').empty().append('Czy na pewno chcesz usunąć grę z ekwipunku?<br/><br/> Nie bierzemy odpowiedzialności za usunięcie nieaktywowanego klucza do gry.<br /><br /><div style="display: block; margin: 0 auto; width: 460px; heigth: 100px;"><div class="login_btn" id="info_yes_btn" style="margin-right: 100px; width: 150px; font-size: 1.6em; float: left;">TAK</div><div class="login_btn" id="info_no_btn" style="width: 150px; float: left; font-size: 1.6em;">NIE</div></div>');

            $('#mini_info_cloud').fadeIn(350);

            var info_yes_clicked = false;
            $("#info_yes_btn").unbind('click');
            $('#info_yes_btn').click(function(){

                if(info_yes_clicked == false)
                {
                    info_yes_clicked = true;

                    $.post("remove_game_from_eq.php", {user_eq_id:item_id}, function(result){

                        if(result == "nieuzytykod") 
                        {
                            $('#bg_blur').fadeIn(300, function(){

                                $('#mini_info_content').empty().append("Nie użyłeś jeszcze klucza do gry! Upewnij się, że gra została aktywowana zanim usuniesz ją z ekwipunku.");

                                $('#mini_info_cloud').fadeIn(350);

                            });
                        }
                        else if(result == "notineq")
                        {
                            $('#bg_blur').fadeIn(300, function(){

                                $('#mini_info_content').empty().append("Wygląda na to, że wybrana gra nie znajduję się już w Twoim ekwipunku.. Skontaktuj się z administracją!");

                                $('#mini_info_cloud').fadeIn(350);

                            });
                        }
                        else if(result == "true")
                        {
                            $('#mini_info_cloud').fadeOut(300, function(){

                                $('#bg_blur').fadeOut(200, function(){

                                    var value = 'header("Refresh:0");';

                                    $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 

                                        $('#deep_content').empty().append(data);

                                    });

                                });

                            });
                        }
                        else
                        {
                            $('#bg_blur').fadeIn(300, function(){

                                $('#mini_info_content').empty().append(result);

                                $('#mini_info_cloud').fadeIn(350);

                            });
                        }

                        setTimeout(function(){
                            info_yes_clicked = false;
                        }, 2000);

                    });
                }

            });

            $("#info_no_btn").unbind('click');
            $('#info_no_btn').click(function(){

                $('#mini_info_cloud').fadeOut(350, function(){
                    $('#bg_blur').fadeOut(200);
                });

            });
        });
        
    });
    
});