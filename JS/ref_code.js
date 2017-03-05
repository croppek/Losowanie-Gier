$(document).ready(function(){
    
    $('#ref_code_input').parent('form').submit(false);
    
    var clicked = false;
    
    $("#add_ref_code_btn").unbind('click');
    $('#add_ref_code_btn').click(function(){
        
        if(clicked == false)
        {
            clicked = true;
            
            setTimeout(function(){
                clicked = false;
            }, 1000);
        
            var ref_code = $('#ref_code_input').val();

            if(ref_code != '')
            {
                ref_code = ref_code.toUpperCase();

                $.post("check_ref_code.php", { ref_code_input:ref_code }, function(result){

                    if(result == "bladpolaczenia")
                    {
                        $('#bg_blur').fadeIn(300, function(){

                            $('#mini_info_content').empty().append('Wystąpił błąd połączenia z bazą danych. Spróbuj ponownie.');

                            $('#mini_info_cloud').fadeIn(350);

                        });
                    }
                    else if(result == "uzytykod")
                    {
                        $('#bg_blur').fadeIn(300, function(){

                            $('#mini_info_content').empty().append('Kod referencyjny został już przez Ciebie użyty.');

                            $('#mini_info_cloud').fadeIn(350);

                        });
                    }
                    else if(result == "brakkodu")
                    {
                        $('#bg_blur').fadeIn(300, function(){

                            $('#mini_info_content').empty().append('Podany kod jest nieprawidłowy.');

                            $('#mini_info_cloud').fadeIn(350);

                        });
                    }
                    else
                    {
                        $('#bg_blur').fadeIn(300, function(){

                            $('#mini_info_content').empty().append('Dziękujemy za skorzystanie z kodu.<br />Twoje konto zostało doładowane o: <b>' + result + ' wPLN</b>. :)');

                            $('#mini_info_cloud').fadeIn(350, function(){

                                var value = 'header("Refresh:0");';

                                $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 

                                    $('#deep_content').empty().append(data);

                                });

                            });

                        });
                    }

                    $('#ref_code_input').val('');

                });
            }
            
        }
        
    });
    
});