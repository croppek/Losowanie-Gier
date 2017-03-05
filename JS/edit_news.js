$(document).ready(function(){
   
    $(".remove_news_btn").unbind('click');
    $('.remove_news_btn').click(function(){
        
        if(confirm("Czy na pewno chcesz usunąć tego newsa?"))
        {
            var conf = "remove";
            var title = $(this).parent().prev().text();
            var date = $(this).parent().next().text();
            date = date.substring(0, 10);
            
            $.post("edit_news.php", {transporter:conf, transporter2:title, date:date}, function(result){
            
                if(result == "removed")
                {
                    var value = 'header("Refresh:0");';
                    
                    $.get('pages/aktualnosci.php', { transporter:value }, function(data){ 

                        $('#deep_content').empty().append(data);
                        
                    });
                }
                else if(result == "blad")
                {
                    alert("Wystąpił błąd podczas usuwania newsa, spróbuj ponownie!");
                    
                }
                else
                {
                    alert(result);
                }
            
            });
        }
        
    });
    
    $(".modify_news_btn").unbind('click');
    $('.modify_news_btn').click(function(){
        
        if(confirm("Czy na pewno chcesz edytować tego newsa?"))
        {
            var conf = "edit";
            //var title = $(this).parent().prev().attr("id");
            
            alert("Przepraszamy, funkcja w trakcie budowy! :) W celu edycji newsa, skontaktuj się z głównym administratorem.");
            
            /*$.post("edit_news.php", {transporter:conf}, function(result){
            
                if(result == "true")
                {
                    
                }
                else if(result == "bladdodawania")
                {
                    alert(result);
                }
            
            });*/
        }
        
    });
    
});