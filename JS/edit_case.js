$(document).ready(function(){
   
    $(".remove_case_btn").unbind('click');
    $('.remove_case_btn').click(function(){
        
        if(confirm("Czy na pewno chcesz usunąć tę skrzynię?"))
        {
            var conf = "remove";
            var title = $(this).parent().next().text();
            var price = $(this).parent().next().next().children('#get_case_price').text();
            
            $.post("edit_case.php", {transporter:conf, transporter2:title, price_transporter:price }, function(result){
            
                if(result == "removed")
                {
                    var value = 'header("Refresh:0");';
                    
                    $.get('pages/sklep.php', { transporter:value }, function(data){ 

                        $('#deep_content').empty().append(data);
                        
                    });
                }
                else if(result == "blad")
                {
                    alert("Wystąpił błąd podczas usuwania skrzyni, spróbuj ponownie!");
                    
                }
                else
                {
                    alert(result);
                }
            
            });
        }
        
    });
    
    $(".modify_case_btn").unbind('click');
    $('.modify_case_btn').click(function(){
        
        if(confirm("Czy na pewno chcesz edytować tę skrzynie?"))
        {
            var conf = "edit";
            //var title = $(this).parent().next().text();
            //var price = $(this).parent().next().next().children('#get_case_price').text();
            
            alert("Przepraszamy, funkcja w trakcie budowy! :) W celu edycji skrzyni, skontaktuj się z głównym administratorem.");
            
            /*$.post("edit_case.php", {transporter:conf}, function(result){
            
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