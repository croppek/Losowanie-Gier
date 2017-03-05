$(document).ready(function(){
    
    $("#more_news_btn").unbind('click');
    $('#more_news_btn').on('click', function(){
        
        ile = ile + 3;
        
        $.post("pages/aktualnosci.php", {transporter:ile}, function(data){
            
            $('#deep_content').empty().append(data);
            
        });
                           
    });
    
});