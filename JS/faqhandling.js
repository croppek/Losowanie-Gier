$(document).ready(function(){
    
    var old_id = 0;
    
    $('.question').unbind('click');
    $('.question').click(function(){
        
        var id = $(this).attr('id');
        var ans_id = $('#ans'+id);
        var arr_id = $('#arr'+id);
        
        if(old_id != 0 && old_id != id)
        {
            $('#'+old_id).animate({color: "#76b0ff"}, 350);
            
            $('#arr'+old_id).hide(1000);
            $('#ans'+old_id).slideUp(500, function(){
                
                $('#'+id).animate({color: "#ffd45e"}, 500);
                
                ans_id.slideDown(500);
                arr_id.show(1000);

                old_id = id;
            
            });
        }
        else if(old_id == id && ans_id.css('display') == 'block')
        {
            $('#'+old_id).animate({color: "#76b0ff"}, 500);
        
            $('#ans'+old_id).slideUp(500);
            arr_id.hide(1000);
        }
        else
        {
            $('#'+id).animate({color: "#ffd45e"}, 500);

            ans_id.slideDown(500);
            arr_id.show(1000);

            old_id = id; 
        }
       
    });
    
});