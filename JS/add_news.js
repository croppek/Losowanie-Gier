$(document).ready(function(){
   
    $("#add_news_btn").unbind('click');
    $('#add_news_btn').on('click', function(){
        
        var tytul = $('#news_title_input').val();
        var data = $('#news_date_input').val();
        var tresc = $('#news_text_input').val();
        
        if(tytul != "" && data != "" && tresc != "")
        {
            $.post("news.php", {tytul_newsa:tytul, data_newsa:data, tresc_newsa:tresc}, function(result){
            
                if(result == "true")
                {
                    alert("Nowy post został pomyślnie dodany! :)");
                    $('#news_title_input').val("");
                    $('#news_date_input').val("");
                    $('#news_text_input').val("");
                }
                else if(result == "bladdodawania")
                {
                    alert("Wystąpił błąd podczas dodawania newsa! Spróbuj ponownie!");
                }
                else if(result == "pustytytul")
                {
                    alert("Pole tytułu nie może być puste!");
                }
                else if(result == "pustadata")
                {
                    alert("Pole daty nie może być puste!");
                }
                else if(result == "pustatresc")
                {
                    alert("Pole treści nie może być puste!");
                }
            
            });
        }
        else
        {
            alert("Wszystkie pola MUSZĄ być uzupełnione!");
            return;
        }
    });
    
});