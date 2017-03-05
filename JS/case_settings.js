$(document).ready(function(){

    $('.case_container').hover(function(){
        
        if($(this).children('div').children('.games_in_case').css('display') == 'none')
        {
            $(this).children('div').children('img').fadeOut(0, function(){

                $(this).siblings('.games_in_case').fadeIn(200);

            });  
        }
        
        }, function(){
        
        if($(this).children('div').children('.games_in_case').css('display') == 'block')
        {
            $(this).children('div').children('.games_in_case').fadeOut(0, function(){

                $(this).siblings('img').fadeIn(200);

            });
        }
        
    });
    
    $(".case_container input").unbind('click');
    $('.case_container input').on('click', function(){
       
        case_title = $(this).parent().children('#case_title').text();
        case_price = $(this).parent().children('#case_price').children('#get_case_price').text();
        
        $('#menu, #content').fadeOut(350, function(){
                
            $('#bg_blur').fadeIn(350, function(){
                
                $.post("get_money_info.php", {price:case_price}, function(result){
                    
                    if(result == 'niestarczy')
                    {
                        $('#open_case_content').empty().append('<span style="display: block; margin-top: 175px;">W Twoim portfelu brakuje środków na otwarcie tej skrzyni.</span>');
                    }
                    else if(result == 'starczy')
                    {
                        $('#open_case_content').empty().append('<span style="display: block; margin-top: 120px;">Czy na pewno chcesz otworzyć skrzynie za ' + case_price + ' wPLN? <br/><br/><div style="display: block; margin: 0 auto; width: 460px; heigth: 100px;"><div class="login_btn" id="case_open_yes_btn" style="margin-right: 100px; width: 150px; font-size: 1.6em; float: left; -webkit-box-shadow: 0px 0px 10px 0px rgb(0, 125, 0); -moz-box-shadow: 0px 0px 10px 0px rgb(0, 125, 0); box-shadow: 0px 0px 10px 0px rgb(0, 125, 0);">TAK</div><div class="login_btn" id="case_open_no_btn" style="width: 150px; float: left; font-size: 1.6em; -webkit-box-shadow: 0px 0px 10px 0px rgb(136, 0, 0); -moz-box-shadow: 0px 0px 10px 0px rgb(136, 0, 0); box-shadow: 0px 0px 10px 0px rgb(136, 0, 0);">NIE</div></div></span><script src="JS/open_case.js"></script>');
                    }
                    
                    $('#open_case_cloud').fadeIn(350);
                    
                });
                
            });

        });
        
    });
    
});
