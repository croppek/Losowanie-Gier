$(document).ready(function(){
    
    var is_open = false;
    chat_msg = 'brakwiadomosci';
    
    $('#chat_title').on('click', function(){
       
        if(is_open == false)
        {
            chat_refresh(chat_msg);
            
            is_open = true;
            
            $('#chat_box').animate({height: "320px"}, 250);
            $('#chat_title').css('-webkit-box-shadow', 'inset 0px 0px 8px 0px rgba(0, 0, 0, 0.8)');
            $('#chat_title').css('-moz-box-shadow', 'inset 0px 0px 8px 0px rgba(0, 0, 0, 0.8)');
            $('#chat_title').css('box-shadow', 'inset 0px 0px 8px 0px rgba(0, 0, 0, 0.8)');
            
            setTimeout(function(){
            
            var elem = document.getElementById('chat_messages');
            elem.scrollTop = elem.scrollHeight;
            
            }, 150);
        }
        else
        {
            is_open = false;
            
            $('#chat_box').animate({height: "40px"}, 250);
            $('#chat_title').css('-webkit-box-shadow', 'none');
            $('#chat_title').css('-moz-box-shadow', 'none');
            $('#chat_title').css('box-shadow', 'none');
        }
        
    });
    
    $('#send_chat_msg').on('click', function(){
        
        var send_chat_msg = $('#chat_msg_input').val();
        
        if(send_chat_msg != '' && send_chat_msg != 'brakwiadomosci')
        {
            chat_refresh(send_chat_msg);
            
            $('#chat_msg_input').val('');
        }
        else
        {
            $('#chat_msg_input').val('');
        }
        
        setTimeout(function(){
            
            var elem = document.getElementById('chat_messages');
            elem.scrollTop = elem.scrollHeight;
            
        }, 500);
        
    });
    
    $('#chat_messages').on('click', '.ban_btn', function(){
        
        var nick = $(this).parent().parent().attr('rel');
    
        if(confirm('Czy napewno chcesz zbanować na czacie użytkownika o nicku: ' + nick + '?'))
        {
            $.post("chatbox.php", {nick_to_ban:nick}, function(result){
                
                if(result == 'true')
                {
                    alert('Pomyślnie zbanowano użytkownika: ' + nick + '!');
                }
                
            });
        }
        
    });
    
});

function chat_refresh(msg)
{
    $.post("chatbox.php", {chat_message:msg}, function(result){
        
        if(result == 'zbanowany')
        {
            clearInterval(chat_interval);
            
            $('#chat_msg_input').prop('disabled', true);
            $('#send_chat_msg').prop('disabled', true);
            
            $('#chat_messages').append('<div id="message_banned" class="chat_message"><h2 style="text-align: center; color: red;">Zostałeś zbanowany na czacie.</h2></div>');
            
            setTimeout(function(){
                
                chat_interval = setInterval(function(){
                    chat_refresh(chat_msg);
                },2500);
                
                $('#chat_msg_input').prop('disabled', false);
                $('#send_chat_msg').prop('disabled', false);
                
            }, 5000);
        }
        else if(result == 'pustawiadomosc')
        {
            clearInterval(chat_interval);
            
            $('#chat_msg_input').prop('disabled', true);
            $('#send_chat_msg').prop('disabled', true);
            
            $('#chat_messages').append('<div id="message_banned" class="chat_message"><h2 style="text-align: center; color: #ff9300;">Nie możesz wysyłać pustych wiadomości.</h2></div>');
            
            setTimeout(function(){
                
                chat_interval = setInterval(function(){
                    chat_refresh(chat_msg);
                },2500);
                
                $('#chat_msg_input').prop('disabled', false);
                $('#send_chat_msg').prop('disabled', false);
                
            }, 5000);
        }
        else if(result == 'brakuzytkownika')
        {
            clearInterval(chat_interval);
            
            $('#chat_msg_input').prop('disabled', true);
            $('#send_chat_msg').prop('disabled', true);
            
            $('#chat_messages').append('<div id="message_banned" class="chat_message"><h2 style="text-align: center; color: #ff9300;">Coś poszło nie tak.. Spróbuj ponownie.</h2></div>');
            
            setTimeout(function(){
                
                chat_interval = setInterval(function(){
                    chat_refresh(chat_msg);
                },2500);
                
                $('#chat_msg_input').prop('disabled', false);
                $('#send_chat_msg').prop('disabled', false);
                
            }, 5000);
        }
        else
        {
            var messages = JSON.parse(result);
            
            $('#chat_messages').empty();

            for(var i in messages)
            {
                if(is_admin === true && messages[ i ].by_admin == '1')
                {
                    $('#chat_messages').prepend('<div id="message_' + messages[ i ].id + '" rel="' + messages[ i ].who + '" class="chat_message"><h2 style="color: #ff6c00;">'+ messages[ i ].who + '<span style="font-size: 10px; color: gray;"> - ' + messages[ i ].date_msg + '</span><span class="ban_btn">Zbanuj</span></h2><p>' + messages[ i ].message + '</p></div>');
                }
                else if (is_admin === true && messages[ i ].by_admin != '1')
                {
                    $('#chat_messages').prepend('<div id="message_' + messages[ i ].id + '" rel="' + messages[ i ].who + '" class="chat_message"><h2>'+ messages[ i ].who + '<span style="font-size: 10px; color: gray;"> - ' + messages[ i ].date_msg + '</span><span class="ban_btn">Zbanuj</span></h2><p>' + messages[ i ].message + '</p></div>');
                }
                else if(messages[ i ].by_admin == '1')
                {
                    $('#chat_messages').prepend('<div id="message_' + messages[ i ].id + '" rel="' + messages[ i ].who + '" class="chat_message"><h2 style="color: #ff6c00;">'+ messages[ i ].who + '<span style="font-size: 10px; color: gray;"> - ' + messages[ i ].date_msg + '</span></h2><p>' + messages[ i ].message + '</p></div>');
                }
                else
                {
                    $('#chat_messages').prepend('<div id="message_' + messages[ i ].id + '" rel="' + messages[ i ].who + '" class="chat_message"><h2>'+ messages[ i ].who + '<span style="font-size: 10px; color: gray;"> - ' + messages[ i ].date_msg + '</span></h2><p>' + messages[ i ].message + '</p></div>');
                }
            }
        }
        
    });
}