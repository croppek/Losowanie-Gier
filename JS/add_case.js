$(document).ready(function(){
    
    var max_percent = 100;
    var case_name = 'Domyślna nazwa';
    var case_price = 1;
    var case_image = "http://i.imgur.com/1Vkjocw.png";
    
    var ile_gier_dodano = 0;
    
    var game_name1 = 'Brak';
    var game_name2 = 'Brak';
    var game_name3 = 'Brak';
    var game_name4 = 'Brak';
    var game_name5 = 'Brak';
    var game_name6 = 'Brak';
    var game_name7 = 'Brak';
    var game_name8 = 'Brak';
    var game_name9 = 'Brak';
    var game_name10 = 'Brak';
    
    var game_percent1 = 0;
    var game_percent2 = 0;
    var game_percent3 = 0;
    var game_percent4 = 0;
    var game_percent5 = 0;
    var game_percent6 = 0;
    var game_percent7 = 0;
    var game_percent8 = 0;
    var game_percent9 = 0;
    var game_percent10 = 0;
    
    var usun_gre1 = '';
    var usun_gre2 = '';
    var usun_gre3 = '';
    var usun_gre4 = '';
    var usun_gre5 = '';
    var usun_gre6 = '';
    var usun_gre7 = '';
    var usun_gre8 = '';
    var usun_gre9 = '';
    var usun_gre10 = '';
    
    rangeInputRefresh();
    casePreviewRefresh();
    
    $('#case_title_input').blur(function(){
        if($(this).val() == "")
        {
            case_name = 'Domyślna nazwa';
        }
        else
        {
            case_name = $(this).val();
        }
        casePreviewRefresh();
    });
    
    $('#case_price_input').blur(function(){
        if($(this).val() == "")
        {
            case_price = 1;
        }
        else
        {
            case_price = $(this).val();
        }
        casePreviewRefresh();
    });
    
    $('#case_image_input').blur(function(){
        if($(this).val() == "")
        {
            case_image = "http://i.imgur.com/1Vkjocw.png";
        }
        else
        {
            case_image = $(this).val();
        }
        casePreviewRefresh();
    });
    
    $("#add_game_to_case_btn").unbind('click');
    $('#add_game_to_case_btn').click(function(){
        
        var lista_gier_value = $('#lista_gier_do_skrzyni').val();
        var range_percentage_value = $('#percentage_range_input').val();
        
        if(lista_gier_value != game_name1 && lista_gier_value != game_name2 && lista_gier_value != game_name3 && lista_gier_value != game_name4 && lista_gier_value != game_name5 && lista_gier_value != game_name6 && lista_gier_value != game_name7 && lista_gier_value != game_name8 && lista_gier_value != game_name9 && lista_gier_value != game_name10)
        {
            if(range_percentage_value > 0 && range_percentage_value != 100)
            {
                if(game_name1 == 'Brak' && game_percent1 == 0)
                {
                    game_name1 = lista_gier_value;
                    game_percent1 = range_percentage_value;
                    usun_gre1 = '<input type="button" value="Usuń" id="remove1" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent1;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 1!');
                }
                else if(game_name2 == 'Brak' && game_percent2 == 0)
                {
                    game_name2 = lista_gier_value;
                    game_percent2 = range_percentage_value;
                    usun_gre2 = '<input type="button" value="Usuń" id="remove2" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent2;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 2!');
                }
                else if(game_name3 == 'Brak' && game_percent3 == 0)
                {
                    game_name3 = lista_gier_value;
                    game_percent3 = range_percentage_value;
                    usun_gre3 = '<input type="button" value="Usuń" id="remove3" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent3;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 3!');
                }
                else if(game_name4 == 'Brak' && game_percent4 == 0)
                {
                    game_name4 = lista_gier_value;
                    game_percent4 = range_percentage_value;
                    usun_gre4 = '<input type="button" value="Usuń" id="remove4" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent4;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 4!');
                }
                else if(game_name5 == 'Brak' && game_percent5 == 0)
                {
                    game_name5 = lista_gier_value;
                    game_percent5 = range_percentage_value;
                    usun_gre5 = '<input type="button" value="Usuń" id="remove5" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent5;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 5!');
                }
                else if(game_name6 == 'Brak' && game_percent6 == 0)
                {
                    game_name6 = lista_gier_value;
                    game_percent6 = range_percentage_value;
                    usun_gre6 = '<input type="button" value="Usuń" id="remove6" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent6;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 6!');
                }
                else if(game_name7 == 'Brak' && game_percent7 == 0)
                {
                    game_name7 = lista_gier_value;
                    game_percent7 = range_percentage_value;
                    usun_gre7 = '<input type="button" value="Usuń" id="remove7" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent7;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 7!');
                }
                else if(game_name8 == 'Brak' && game_percent8 == 0)
                {
                    game_name8 = lista_gier_value;
                    game_percent8 = range_percentage_value;
                    usun_gre8 = '<input type="button" value="Usuń" id="remove8" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent8;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 8!');
                }
                else if(game_name9 == 'Brak' && game_percent9 == 0)
                {
                    game_name9 = lista_gier_value;
                    game_percent9 = range_percentage_value;
                    usun_gre9 = '<input type="button" value="Usuń" id="remove9" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent9;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 9!');
                }
                else if(game_name10 == 'Brak' && game_percent10 == 0)
                {
                    game_name10 = lista_gier_value;
                    game_percent10 = range_percentage_value;
                    usun_gre10 = '<input type="button" value="Usuń" id="remove10" style="margin: 0 0 0 10px;">';
                    
                    max_percent -= game_percent10;
                    
                    ile_gier_dodano++;
                    
                    alert('Dodano do slotu numer 10!');
                }
                else
                {
                    alert('Wszystkie sloty na gry zostały już zajęte!');
                    return;
                }
                
                rangeInputRefresh();
                casePreviewRefresh();
            }
            else
            {
                alert('Procent szans na wylosowanie gry nie może być równy 0 oraz 100!');
            }
        }
        else
        {
            alert('Wybrana gra została już wcześniej dodana do skrzyni!');
        }
        
    });
    
    $("#game_in_case_list").unbind('click');
    $('#game_in_case_list').on('click','#remove1,#remove2,#remove3,#remove4,#remove5,#remove6,#remove7,#remove8,#remove9,#remove10',function(){
        
        var remove_id = $(this).attr("id");
        
        if(confirm('Czy na pewno chcesz usunąć tę grę ze skrzyni?'))
        {
            if(remove_id == "remove1")
            {
                game_name1 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent1);
                game_percent1 = 0;
                
                ile_gier_dodano--;

                usun_gre1 = '';

            }
            else if(remove_id == "remove2")
            {
                game_name2 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent2);
                game_percent2 = 0;
                
                ile_gier_dodano--;

                usun_gre2 = '';

            }
            else if(remove_id == "remove3")
            {
                game_name3 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent3);
                game_percent3 = 0;
                
                ile_gier_dodano--;

                usun_gre3 = '';

            }
            else if(remove_id == "remove4")
            {
                game_name4 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent4);
                game_percent4 = 0;
                
                ile_gier_dodano--;

                usun_gre4 = '';

            }
            else if(remove_id == "remove5")
            {
                game_name5 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent5);
                game_percent5 = 0;
                
                ile_gier_dodano--;

                usun_gre5 = '';

            }
            else if(remove_id == "remove6")
            {
                game_name6 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent6);
                game_percent6 = 0;
                
                ile_gier_dodano--;

                usun_gre6 = '';

            }
            else if(remove_id == "remove7")
            {
                game_name7 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent7);
                game_percent7 = 0;
                
                ile_gier_dodano--;

                usun_gre7 = '';

            }
            else if(remove_id == "remove8")
            {
                game_name8 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent8);
                game_percent8 = 0;
                
                ile_gier_dodano--;

                usun_gre8 = '';

            }
            else if(remove_id == "remove9")
            {
                game_name9 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent9);
                game_percent2 = 0;
                
                ile_gier_dodano--;

                usun_gre9 = '';

            }
            else if(remove_id == "remove10")
            {
                game_name10 = "Brak";

                max_percent = parseFloat(max_percent) + parseFloat(game_percent10);
                game_percent10 = 0;
                
                ile_gier_dodano--;

                usun_gre10 = '';

            }
            
            rangeInputRefresh();
            casePreviewRefresh();
        }        
        
    });
    
    $("#add_case_btn").unbind('click');
    $('#add_case_btn').click(function(){
        
        if(max_percent == 0 && case_name != 'Domyślna nazwa' && case_image != "http://i.imgur.com/1Vkjocw.png" && ile_gier_dodano >= 2 && case_price > 0)
        {
            if(confirm("Czy na pewno chcesz dodać tę skrzynię do sklepu?"))
            {    
                if(game_name1 == "Brak" && game_percent1 == 0)
                {
                    game_name1 = '';
                    game_percent1 = '';
                }
                
                if(game_name2 == "Brak" && game_percent2 == 0)
                {
                    game_name2 = '';
                    game_percent2 = '';
                }
                
                if(game_name3 == "Brak" && game_percent3 == 0)
                {
                    game_name3 = '';
                    game_percent3 = '';
                }
                
                if(game_name4 == "Brak" && game_percent4 == 0)
                {
                    game_name4 = '';
                    game_percent4 = '';
                }
                
                if(game_name5 == "Brak" && game_percent5 == 0)
                {
                    game_name5 = '';
                    game_percent5 = '';
                }
                
                if(game_name6 == "Brak" && game_percent6 == 0)
                {
                    game_name6 = '';
                    game_percent6 = '';
                }
                
                if(game_name7 == "Brak" && game_percent7 == 0)
                {
                    game_name7 = '';
                    game_percent7 = '';
                }
                
                if(game_name8 == "Brak" && game_percent8 == 0)
                {
                    game_name8 = '';
                    game_percent8 = '';
                }
                
                if(game_name9 == "Brak" && game_percent9 == 0)
                {
                    game_name9 = '';
                    game_percent9 = '';
                }
                
                if(game_name10 == "Brak" && game_percent10 == 0)
                {
                    game_name10 = '';
                    game_percent10 = '';
                }
                
                $.post("add_case.php", { nazwa_skrzyni_input:case_name, cena_skrzyni_input:case_price, grafika_skrzyni_input:case_image, game_name1:game_name1,  game_name2:game_name2, game_name3:game_name3, game_name4:game_name4, game_name5:game_name5, game_name6:game_name6, game_name7:game_name7, game_name8:game_name8, game_name9:game_name9, game_name10:game_name10, game_percent1:game_percent1, game_percent2:game_percent2, game_percent3:game_percent3, game_percent4:game_percent4, game_percent5:game_percent5, game_percent6:game_percent6, game_percent7:game_percent7, game_percent8:game_percent8, game_percent9:game_percent9, game_percent10:game_percent10 }, function(result){

                    if(result == "true")
                    {
                        alert("Skrzynia została pomyślnie dodana do sklepu!");
                        
                        var value = 'header("Refresh:0");';
                        
                        $.get('pages/panel_admina.php', { transporter:value }, function(data){ 
                
                            $('#deep_content').empty().append(data).delay(100).fadeIn(200);  
                        });
                    }
                    else if(result == "pustanazwa")
                    {
                        alert("Nazwa skrzyni nie może być pusta!");
                    }
                    else if(result == "pustacena")
                    {
                        alert("Cena skrzyni nie może być pusta!");
                    }
                    else if(result == "zlacena")
                    {
                        alert("Cena skrzyni nie może być mniejsza lub równa 0 wPLN!");
                    }
                    else if(result == "zajetanazwa")
                    {
                        alert("Skrzynia o takiej nazwie znajduje się już w bazie danych!");
                    }
                    else if(result == "pustagrafika")
                    {
                        alert("Grafika skrzyni nie może być pusta!");
                    }
                    else
                    {
                        alert(result);
                    }
                    
                });
                
            }
        }
        else if(ile_gier_dodano < 2)
        {
            alert("Do skrzyni muszą zostać dodane co najmniej 2 gry!");
        }
        else if(max_percent != 0)
        {
            alert("Suma procent szans na wylosowanie gier dodanych do skrzyni musi równać się 100!");
        }
        else if(case_name == 'Domyślna nazwa')
        {
            alert("Ustaw nazwę skrzyni!");
        }
        else if(case_image == "http://i.imgur.com/1Vkjocw.png")
        {
            alert("Podaj adres URL do grafiki skrzyni!");
        }
        else if(case_price <= 0)
        {
            alert("Cena skrzyni nie może być mniejsza lub równa 0 wPLN!");
        }
        
    });
    
    function rangeInputRefresh()
    {
        $('#range_input_div').empty().append('<p style="display: inline-block;">0</p><input type="range" id="percentage_range_input" name="procent_szans" min="0" max="'+max_percent+'" value="'+max_percent+'" step="0.5" style="margin: 0 20px 0 20px;" oninput="percentage_range_value.value = percentage_range_input.value"><p id="max_percentage_add_case" style="display: inline-block;">'+max_percent+'</p><br /><output id="percentage_range_value" class="login_text_input" style="width: 60px; padding: 5px; height: 35px; margin: -20px auto 0; display: inline-block;">'+max_percent+'</output><p style="display: inline-block; margin-left: 5px;"><b>%</b></p>');
    }
    
    function casePreviewRefresh()
    {
        $('#game_in_case_list').empty().append('Nazwa: <b>'+case_name+'</b><br/>Cena otwarcia: <b>'+case_price+' wPLN</b><br />Podgląd grafiki skrzyni:<br /><img src="'+case_image+'" width="300px" height="200px"/><br /><br />Gry w skrzyni:<br/><span style="display: block; text-align: left;">1. <b>'+game_name1+'</b> - <b><span style="color: orange;">'+game_percent1+'%</span></b>'+usun_gre1+'<br />2. <b>'+game_name2+'</b> - <b><span style="color: orange;">'+game_percent2+'%</span></b>'+usun_gre2+'<br />3. <b>'+game_name3+'</b> - <b><span style="color: orange;">'+game_percent3+'%</span></b>'+usun_gre3+'<br />4. <b>'+game_name4+'</b> - <b><span style="color: orange;">'+game_percent4+'%</span></b>'+usun_gre4+'<br />5. <b>'+game_name5+'</b> - <b><span style="color: orange;">'+game_percent5+'%</span></b>'+usun_gre5+'<br />6. <b>'+game_name6+'</b> - <b><span style="color: orange;">'+game_percent6+'%</span></b>'+usun_gre6+'<br />7. <b>'+game_name7+'</b> - <b><span style="color: orange;">'+game_percent7+'%</span></b>'+usun_gre7+'<br />8. <b>'+game_name8+'</b> - <b><span style="color: orange;">'+game_percent8+'%</span></b>'+usun_gre8+'<br />9. <b>'+game_name9+'</b> - <b><span style="color: orange;">'+game_percent9+'%</span></b>'+usun_gre9+'<br />10. <b>'+game_name10+'</b> - <b><span style="color: orange;">'+game_percent10+'%</span></b>'+usun_gre10+'<br /></span>');
    }
    
});