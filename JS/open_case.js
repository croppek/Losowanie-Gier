$(document).ready(function(){
    
    $("#case_open_no_btn").unbind('click');
    $('#case_open_no_btn').click(function(){
        
        $('#open_case_cloud').fadeOut(350, function(){
            
            $('#bg_blur').fadeOut(350, function(){
                $('#menu, #content').fadeIn(500);
            });
            
        }); 
        
    });
    
    var case_clicked = false;
    $("#case_open_yes_btn").unbind('click');
    $('#case_open_yes_btn').on('click', function(){
        
        if(case_clicked == false)
        {
            case_clicked = true;
            
            $.post("get_case_info.php", {title:case_title, price:case_price}, function(result){

                if(result == 'blad_polaczenia')
                {
                    $('#open_case_content').fadeOut(250, function(){

                       $(this).empty().append('Wystąpił błąd połączenia z bazą danych. <br/><br/> Spróbuj ponownie.').fadeIn(250);

                    });
                }
                else if(result == 'blad')
                {
                    $('#open_case_content').fadeOut(250, function(){

                       $(this).empty().append('Wystąpił błąd połączenia z bazą danych. <br/><br/> Spróbuj ponownie.').fadeIn(250);

                    });
                }
                else
                {
                    var gry = JSON.parse(result);

                    $('#open_case_close_btn').fadeOut(250);
                    $('#open_case_content').fadeOut(250, function(){

                        $(this).empty();

                        $(this).append('<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>');

                        $(this).fadeIn(150);

                        var game_images_array = new Array();
                        var game_percents = new Array();
                        var game_names = new Array();

                        for(var i in gry)
                        {
                            var game_name1 = gry[ i ].game_name1;
                            var game_percent1 = gry[ i ].game_percent1;

                            var game_name2 = gry[ i ].game_name2;
                            var game_percent2 = gry[ i ].game_percent2;

                            var game_name3 = gry[ i ].game_name3;
                            var game_percent3 = gry[ i ].game_percent3;

                            var game_name4 = gry[ i ].game_name4;
                            var game_percent4 = gry[ i ].game_percent4;

                            var game_name5 = gry[ i ].game_name5;
                            var game_percent5 = gry[ i ].game_percent5;

                            var game_name6 = gry[ i ].game_name6;
                            var game_percent6 = gry[ i ].game_percent6;

                            var game_name7 = gry[ i ].game_name7;
                            var game_percent7 = gry[ i ].game_percent7;

                            var game_name8 = gry[ i ].game_name8;
                            var game_percent8 = gry[ i ].game_percent8;

                            var game_name9 = gry[ i ].game_name9;
                            var game_percent9 = gry[ i ].game_percent9;

                            var game_name10 = gry[ i ].game_name10;
                            var game_percent10 = gry[ i ].game_percent10;

                            if(game_name1 != '')
                            {
                                game_names.push(game_name1);
                            }
                            if(game_percent1 != 0)
                            {
                                game_percents.push(game_percent1);
                            }

                            if(game_name2 != '')
                            {
                                game_names.push(game_name2);
                            }
                            if(game_percent2 != 0)
                            {
                                game_percents.push(game_percent2);
                            }

                            if(game_name3 != '')
                            {
                                game_names.push(game_name3);
                            }
                            if(game_percent3 != 0)
                            {
                                game_percents.push(game_percent3);
                            }

                            if(game_name4 != '')
                            {
                                game_names.push(game_name4);
                            }
                            if(game_percent4 != 0)
                            {
                                game_percents.push(game_percent4);
                            }

                            if(game_name5 != '')
                            {
                                game_names.push(game_name5);
                            }
                            if(game_percent5 != 0)
                            {
                                game_percents.push(game_percent5);
                            }

                            if(game_name6 != '')
                            {
                                game_names.push(game_name6);
                            }
                            if(game_percent6 != 0)
                            {
                                game_percents.push(game_percent6);
                            }

                            if(game_name7 != '')
                            {
                                game_names.push(game_name7);
                            }
                            if(game_percent7 != 0)
                            {
                                game_percents.push(game_percent7);
                            }

                            if(game_name8 != '')
                            {
                                game_names.push(game_name8);
                            }
                            if(game_percent8 != 0)
                            {
                                game_percents.push(game_percent8);
                            }

                            if(game_name9 != '')
                            {
                                game_names.push(game_name9);
                            }
                            if(game_percent9 != 0)
                            {
                                game_percents.push(game_percent9);
                            }

                            if(game_name10 != '')
                            {
                                game_names.push(game_name10);
                            }
                            if(game_percent10 != 0)
                            {
                                game_percents.push(game_percent10);
                            }

                        }

                        $.post("get_game_image.php", {game_name1:game_name1, game_name2:game_name2, game_name3:game_name3, game_name4:game_name4, game_name5:game_name5, game_name6:game_name6, game_name7:game_name7, game_name8:game_name8, game_name9:game_name9, game_name10:game_name10}, function(result2){

                            var game_images = JSON.parse(result2);

                            for(var img in game_images)
                            {
                                if(game_images[img].image != undefined)
                                {
                                    game_images_array.push(game_images[img].image);
                                }  
                            }

                        });

                        setTimeout(function(){

                            var nothing = false;

                            $('#open_case_content').fadeOut(150, function(){

                                $(this).empty();

                                var wynik = getRandomFloatNumber(1,100);
                                
                                var actual_percent = 0;
                                var confirmed_percent = 0;
                                
                                //Przygotowanie tabeli z użytymi iteratorami
                                var used_iterators = [11,11,11,11,11,11,11,11,11,11];
                                var random_iterator;
                                var game_arr_len = game_percents.length;
                                
                                for(var iterator = 0; iterator < game_arr_len; iterator++)
                                {
                                    //Losowanie randomowego iteratora zapewnia dodatkową losowość wyniku
                                    do
                                    {
                                        //Skracanie zakresu losowania liczb dla szybszego rozwiązania
                                        if(used_iterators.some(function(x){return x == 0;}) && used_iterators.some(function(x){return x == (game_arr_len - 1);}))
                                        {
                                            random_iterator = getRandomNumber(1,(game_arr_len - 2));
                                        }
                                        else if(used_iterators.some(function(x){return x == 0;}))
                                        {
                                            random_iterator = getRandomNumber(1,(game_arr_len - 1));
                                        }
                                        else if(used_iterators.some(function(x){return x == (game_arr_len - 1);}))
                                        {
                                            random_iterator = getRandomNumber(0,(game_arr_len - 2));
                                        }
                                        else
                                        {
                                            random_iterator = getRandomNumber(0,(game_arr_len - 1));
                                        }
                                        
                                    }
                                    while(used_iterators.some(function(y){return y == random_iterator;}));
                                    
                                    used_iterators[iterator] = random_iterator;
                                    
                                    actual_percent = game_percents[random_iterator];
                                    actual_percent = parseFloat(actual_percent);
                                    
                                    if(actual_percent != 0)
                                    {
                                        if(wynik > confirmed_percent && wynik <= (confirmed_percent + actual_percent))
                                        {
                                            var winning_game = game_names[random_iterator];
                                            var winning_iterator = random_iterator;
                                        }
                                        confirmed_percent += actual_percent;
                                    }
                                }
                                
                                var blad_losowania = false;
                                
                                setTimeout(function(){
                                
                                    $.post("append_user_eq.php", {winning_game:winning_game, case_price:case_price}, function(result){

                                        if(result == 'nic')
                                        {
                                            nothing = true;
                                        }
                                        else if(result == 'zamalokasy')
                                        {
                                            blad_losowania = true;
                                        }
                                        else if(result == 'brakgry')
                                        {
                                            blad_losowania = true;
                                        }
                                        else if(result == 'bladaktualizacjibazy')
                                        {
                                            blad_losowania = true;
                                        }
                                        else if(result == 'true')
                                        {
                                        }
                                        else
                                        {
                                            blad_losowania = true;
                                        }

                                    });
                                    
                                    setTimeout(function(){
                                    
                                        if(blad_losowania == true)
                                        {
                                            $.post("append_user_eq.php", {winning_game:winning_game, case_price:case_price}, function(result){

                                                if(result == 'nic')
                                                {
                                                    blad_losowania = false;
                                                    
                                                    nothing = true;
                                                }
                                                else if(result == 'zamalokasy')
                                                {
                                                    blad_losowania = true;
                                                }
                                                else if(result == 'brakgry')
                                                {
                                                    blad_losowania = true;
                                                }
                                                else if(result == 'bladaktualizacjibazy')
                                                {
                                                    blad_losowania = true;
                                                }
                                                else if(result == 'true')
                                                {
                                                    blad_losowania = false;
                                                }
                                                else
                                                {
                                                    blad_losowania = true;
                                                }
                                                
                                            });
                                        }

                                        setTimeout(function(){

                                            if(blad_losowania == true)
                                            {
                                                $.post("append_user_eq.php", {winning_game:winning_game, case_price:case_price}, function(result){

                                                    if(result == 'nic')
                                                    {
                                                        blad_losowania = false;

                                                        nothing = true;
                                                    }
                                                    else if(result == 'zamalokasy')
                                                    {
                                                        alert("Masz za mało pieniędzy na otwarcie tej skrzyni, losowanie zostaje unieważnione.");
                                                    }
                                                    else if(result == 'brakgry')
                                                    {
                                                        alert("Na serwerze wystąpił błąd, aktualne losowanie zostało unieważnione, a Twoje pieniądze zwrócone do portfela. W przypadku wystąpienia kolejnych problemów prosimy o kontakt z adminstracją.");
                                                    }
                                                    else if(result == 'bladaktualizacjibazy')
                                                    {
                                                        alert("Na serwerze wystąpił błąd, aktualne losowanie zostało unieważnione, a Twoje pieniądze zwrócone do portfela. W przypadku wystąpienia kolejnych problemów prosimy o kontakt z adminstracją.");
                                                    }
                                                    else if(result == 'true')
                                                    {
                                                        blad_losowania = false;
                                                    }
                                                    else
                                                    {
                                                        alert("Na serwerze wystąpił błąd, aktualne losowanie zostało unieważnione, a Twoje pieniądze zwrócone do portfela. W przypadku wystąpienia kolejnych problemów prosimy o kontakt z adminstracją.");
                                                    }

                                                });
                                            }

                                        }, 1000);
                                        
                                    }, 1000 );
                                    
                                }, 1500);

                                var random_scenario = getRandomNumber(1,5);
                                
                                var winning_element;
                                var stop1;
                                var stop2;
                                var animation_duration;
                                
                                if(random_scenario == 1)
                                {
                                    winning_element = 25;
                                    stop1 = 5075;
                                    stop2 = 5260;
                                    animation_duration = 5000;
                                }
                                else if(random_scenario == 2)
                                {
                                    winning_element = 24;
                                    stop1 = 4850;
                                    stop2 = 5035;
                                    animation_duration = 4778;
                                }
                                else if(random_scenario == 3)
                                {
                                    winning_element = 23;
                                    stop1 = 4625;
                                    stop2 = 4810;
                                    animation_duration = 4556;
                                }
                                else if(random_scenario == 4)
                                {
                                    winning_element = 22;
                                    stop1 = 4405;
                                    stop2 = 4585;
                                    animation_duration = 4334;
                                }
                                else if(random_scenario == 5)
                                {
                                    winning_element = 21;
                                    stop1 = 4180;
                                    stop2 = 4360;
                                    animation_duration = 4112;
                                }

                                $(this).append('<div id="draw_container"><div id="draw_indicator"></div><div id="elements_wrapper"></div></div>');

                                var i = 1;
                                var img_arr_len = game_images_array.length;
                                var which_img = '';
                                var which_number;
                                var prev_number = '';

                                while($('#draw_element25').length == 0 && i <= 25)
                                {
                                    if(i == winning_element)
                                    {
                                        which_img = game_images_array[winning_iterator];
                                    }
                                    else
                                    {
                                        which_number = getRandomNumber(0,(img_arr_len-1));

                                        if(which_number == prev_number)
                                        {
                                            if((which_number - 1) < 0)
                                            {
                                                if((which_number + 1) <= (img_arr_len-1))
                                                {
                                                    which_number = which_number + 1;
                                                }
                                            }
                                            else
                                            {
                                                which_number = which_number - 1;
                                            }  
                                        }
                                        which_img = game_images_array[which_number];

                                    }

                                    $('#elements_wrapper').append('<div id="draw_element'+i+'" class="draw_element"><img src="'+which_img+'" style="width: 160px; height: 220px; border-radius: 5px;"/></div>');
                                    i++;
                                    prev_number = which_number;
                                }

                                function getRandomFloatNumber(min, max) {
                                    return Math.round((Math.random() * (max - min + 1) + min) * 100) / 100;
                                }
                                
                                function getRandomNumber(min, max) {
                                    return Math.floor(Math.random() * (max - min + 1)) + min;
                                }

                                $(this).fadeIn(250, function(){

                                    var game_in_eq_id = '';
                                    var winning_game_price = '';

                                    var where_to_stop = '-' + getRandomNumber(stop1,stop2) + 'px';

                                    setTimeout(function(){
                                        
                                        setTimeout(function(){
                                            
                                            $.post("get_game_info_from_eq.php", {what:"id"}, function(result){

                                                game_in_eq_id = result;

                                            });
                                            
                                        }, 3500);

                                        setTimeout(function(){
                                            
                                            if(blad_losowania == false)
                                            {
                                                $.post("get_game_info_from_eq.php", {what:game_in_eq_id}, function(result){

                                                    winning_game_price = result;

                                                });
                                            }
                                            else
                                            {
                                                winning_game_price = 0;
                                            }

                                        }, 4500);

                                        //$('#elements_wrapper').animate({marginLeft: where_to_stop}, 5000, function(){
                                        $('#elements_wrapper').velocity({ marginLeft: where_to_stop }, { duration: animation_duration }, "ease-in-out");
                                        
                                        setTimeout(function(){

                                            var value = 'header("Refresh:0");';
                                            $.get('pages/sklep.php', { transporter:value }, function(data){ 

                                                $('#deep_content').empty().append(data);

                                            });

                                            setTimeout(function(){

                                                $('#open_case_content').fadeOut(350, function(){
                                                    
                                                    setTimeout(function(){
                                                        case_clicked = false;
                                                    }, 1000);

                                                    if(nothing == true)
                                                    {
                                                        $(this).empty().append('<div id="draw_element'+winning_element+'" class="draw_element" style="margin: 0 auto; display: block; float: none; border: 5px solid rgba(206, 192, 132, 0.85);"><img src="'+game_images_array[winning_iterator]+'" style="width: 160px; height: 220px; border-radius: 5px;"/></div><br/><br/>Niestety tym razem nic nie wygrywasz, ale zwracamy Ci 0.5 wPLN do portfela. :)').fadeIn(350);
                                                        $('#open_case_close_btn').fadeIn(250);
                                                    }
                                                    else
                                                    {
                                                        $(this).empty().append('<div id="draw_element'+winning_element+'" class="draw_element" style="margin: 0 auto 10px; display: block; float: none; border: 5px solid rgba(206, 192, 132, 0.85);"><img src="'+game_images_array[winning_iterator]+'" style="width: 160px; height: 220px; border-radius: 5px;"/></div><b>'+winning_game+'</b><br/> <span style="margin: 5px 0; display: block;">~'+winning_game_price+' PLN</span><div class="login_btn" id="keep_game_btn" style="margin-right: 100px; margin-left: 75px; float: left; width: 200px; font-size: 1.5em;">Zachowaj</div><div class="login_btn" id="direct_sell_btn" style="float: left; width: 200px; font-size: 1.5em;">Sprzedaj</div>').fadeIn(350);
                                                        $('#open_case_close_btn').fadeIn(250);

                                                        $('#keep_game_btn').unbind('click');
                                                        $('#keep_game_btn').on('click', function(){

                                                            $('#open_case_cloud').fadeOut(350, function(){

                                                                $('#bg_blur').fadeOut(350, function(){
                                                                    $('#menu, #content').fadeIn(500);
                                                                });

                                                            });

                                                        });

                                                        $('#direct_sell_btn').unbind('click');
                                                        $('#direct_sell_btn').on('click', function(){

                                                            $('#open_case_content').fadeOut(350, function(){

                                                                $('#open_case_content').empty().append('<span style="display: block; margin-top: 130px;">Czy chcesz sprzedać grę za 50% jej wartości?<br/> Twój portfel zostanie doładowany o: <b>'+winning_game_price/2+' wPLN</b>.<br/><br/><div class="login_btn" id="direct_yes_btn" style="margin-right: 100px; margin-left: 75px; float: left; width: 200px; font-size: 1.5em;">TAK</div><div class="login_btn" id="direct_no_btn" style="float: left; width: 200px; font-size: 1.5em;">NIE</div></span>').fadeIn(350);

                                                                $('#direct_yes_btn').unbind('click');
                                                                $('#direct_yes_btn').on('click', function(){
                                                                    
                                                                    if(blad_losowania == false)
                                                                    {
                                                                        $.post("sell_game_from_eq.php", {user_eq_id:game_in_eq_id}, function(result){

                                                                            if(result == "bladpolaczenia") 
                                                                            {
                                                                                $('#open_case_content').fadeOut(350, function(){

                                                                                    $('#open_case_content').empty().append('Wystąpił błąd podczas łączenia z bazą danych! Spróbuj ponownie później.').fadeIn(350);

                                                                                });
                                                                            }
                                                                            else if(result == "notineq")
                                                                            {
                                                                                $('#open_case_content').fadeOut(350, function(){

                                                                                    $('#open_case_content').empty().append('Wygląda na to, że wybrana gra nie znajduję się już w Twoim ekwipunku.. Skontaktuj się z administracją!').fadeIn(350);

                                                                                });
                                                                            }
                                                                            else
                                                                            {
                                                                                $('#open_case_cloud').fadeOut(300, function(){

                                                                                    var value = 'header("Refresh:0");';

                                                                                    $.get('pages/sklep.php', { transporter:value }, function(data){ 

                                                                                        $('#deep_content').empty().append(data);

                                                                                        $('#menu, #content').fadeIn(500);

                                                                                        setTimeout(function(){

                                                                                                $('#mini_info_content').empty().append('Do Twojego portfela dodano: <b>'+ result +' wPLN</b>.');

                                                                                                $('#mini_info_cloud').fadeIn(350);

                                                                                        }, 200);

                                                                                    });

                                                                                });
                                                                            }

                                                                        });
                                                                    }
                                                                    else
                                                                    {
                                                                        $('#open_case_cloud').fadeOut(300, function(){

                                                                            $('#deep_content').empty().append(data);

                                                                            $('#menu, #content').fadeIn(500);

                                                                            setTimeout(function(){

                                                                                $('#mini_info_content').empty().append('Do Twojego portfela nie dodano pieniędzy z powodu wystąpienia błędu losowania.');

                                                                                $('#mini_info_cloud').fadeIn(350);

                                                                            }, 200);

                                                                        });
                                                                    }

                                                                });

                                                                $('#direct_no_btn').unbind('click');
                                                                $('#direct_no_btn').on('click', function(){

                                                                    $('#open_case_cloud').fadeOut(350, function(){

                                                                        $('#bg_blur').fadeOut(350, function(){
                                                                            $('#menu, #content').fadeIn(500);
                                                                        });

                                                                    });

                                                                });

                                                            });

                                                        });
                                                    }

                                                });

                                            }, 1000);

                                        }, animation_duration);

                                    }, 1000);

                                });

                            });

                        }, 800);

                    });
                }

            });
        }
        
    });
    
});