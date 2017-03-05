$(document).ready(function(){
    
    $('form').submit(false);
    
    $("#add_game_to_db_btn").unbind('click');
    $('#add_game_to_db_btn').click(function(){
        
        var add_game_title = $('#add_game_title_input').val();
        var add_game_image = $('#add_game_image_input').val();
        var add_game_price = $('#add_game_price_input').val();
        
        if(add_game_image == '' || add_game_price == 0 || add_game_title == '')
        {
            alert("Wszystkie pola muszą być uzupełnione!");
        }
        else
        {
            if(confirm('Czy na pewno chcesz dodać grę do bazy danych?'))
            {
                $.post("add_game_to_db.php", { add_game_title:add_game_title, add_game_price:add_game_price, add_game_image:add_game_image }, function(result){

                    if(result == "true")
                    {
                        alert("Gra została pomyślnie dodana do bazy danych!");
                        
                        var value = 'header("Refresh:0");';
                        
                        $.get('pages/panel_admina.php', { transporter:value }, function(data){ 
                
                            $('#deep_content').empty().append(data).delay(100).fadeIn(200);  
                        });
                    }
                    else if(result == "pustanazwa")
                    {
                        alert("Nazwa gry nie może być pusta!");
                    }
                    else if(result == "pustacena")
                    {
                        alert("Cena gry nie może być pusta!");
                    }
                    else if(result == "zlacena")
                    {
                        alert("Cena gry nie może być mniejsza lub równa 0 PLN!");
                    }
                    else if(result == "pustagrafika")
                    {
                        alert("Grafika gry nie może być pusta!");
                    }
                    else if(result == "zajetanazwa")
                    {
                        alert("Ta gra znajduje się już w bazie danych!");
                    }
                    else if(result == "bladdodawania")
                    {
                        alert("Wystąpił błąd podczas dodawania! Spróbuj ponownie.");
                    }
                    else
                    {
                        alert(result);
                    }
                    
                });
            }
        }
        
    });
    
});