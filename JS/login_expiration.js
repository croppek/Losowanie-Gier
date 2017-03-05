$(document).ready(function(){
    
    $(document).idle({
        
      onIdle: function(){
          
        var value = 'header("Refresh:0");';
        $.get("iflogged.php", {transporter:value}, function(odpowiedz){
            if(odpowiedz == "admin")
            {
                if($('#open_case_cloud').css('display') != 'none')
                {
                    $('#open_case_cloud').fadeOut(500);
                }

                if($('#mini_info_cloud').css('display') != 'none')
                {
                    $('#mini_info_cloud').fadeOut(500);
                }
                
                if($('#info_cloud').css('display') != 'none')
                {
                    $('#info_cloud').fadeOut(500);
                }
                
                logout();
                setTimeout(function(){
                    
                    $('#menu, #content').fadeOut(350, function(){
                        
                        $('#info_cloud_content').empty().append('<div style="display: block; text-align: center; font-size: 1.5em; padding-top: 20px;">Byłeś(aś) nieaktywny(a) przez dłuższy czas! <br /><br /> <span style="font-size: 0.8em; color: rgba(255, 255, 255, 0.5);">W celu zapewnienia bezpieczeństwa zostałeś(aś) automatycznie wylogowany(a). :)</span></div>');

                        $('#bg_blur').fadeIn(250);
                        $('#info_cloud').fadeIn(500);
                        
                    });
                    
                }, 1000);
            }
            else if(odpowiedz == "zalogowany")
            {
                if($('#open_case_cloud').css('display') != 'none')
                {
                    $('#open_case_cloud').fadeOut(500);
                }

                if($('#mini_info_cloud').css('display') != 'none')
                {
                    $('#mini_info_cloud').fadeOut(500);
                }
                
                if($('#info_cloud').css('display') != 'none')
                {
                    $('#info_cloud').fadeOut(500);
                }
                
                logout();
                setTimeout(function(){
                    
                    $('#menu, #content').fadeOut(350, function(){
                        
                        $('#info_cloud_content').empty().append('<div style="display: block; text-align: center; font-size: 1.5em; padding-top: 20px;">Byłeś(aś) nieaktywny(a) przez dłuższy czas! <br /><br /> <span style="font-size: 0.8em; color: rgba(255, 255, 255, 0.5);">W celu zapewnienia bezpieczeństwa zostałeś(aś) automatycznie wylogowany(a). :)</span></div>');

                        $('#bg_blur').fadeIn(250);
                        $('#info_cloud').fadeIn(500);
                        
                    });
                    
                }, 1000);
            }
            else
            {

            }
        });
          
      }, idle: 600000});
    
});