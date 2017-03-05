$(document).ready(function(){
    
    ile = 3;
    
    $('form').submit(false);
    
    if($('#aktualnosci_btn').hasClass("active"))
    {
        last_clicked = 'aktualnosci_btn';
    }
    else if($('#panel_klienta_btn').hasClass("active"))
    {
        last_clicked = 'panel_klienta_btn';
    }
    
    $("#menu ul li").unbind('click');
    $('#menu ul li').on('click', function(){
        
        var which = $(this).attr('id');
        
        change_active();
        
        function change_active()
        {
            $('#'+last_clicked).removeClass('active');
            $('#'+which).addClass('active');
            last_clicked = which;
        }
        
        switch(which)
        {
            case "aktualnosci_btn":
                           
                    $('#content').attr("rel", "aktualnosci");
                
                break;
            case "panel_klienta_btn": 
                
                    $('#content').attr("rel", "panel_klienta");
                
                break;
            case "zagraj_btn": 
                
                    $('#content').attr("rel", "zagraj");
                
                break;
            case "nagrody_btn":
                
                    $('#content').attr("rel", "nagrody");
                
                break;
            case "kontakt_btn":
                
                    $('#content').attr("rel", "kontakt");
                    
                break;
            case "panel_admina_btn":
                
                    $('#content').attr("rel", "panel_admina");
                    
                break;
            case "sklep_btn":
                
                    $('#content').attr("rel", "sklep");
                    
                break;
        }
        
        $('#deep_content').fadeOut(250, function(){
            
            //$('#css-loader').fadeIn(10);
            
            setTimeout(function(){
                
                if($('#deep_content').css('display') == 'none')
                {
                    //$('#css-loader').css('display', 'block');
                    if($('#css-loader').text() == '')
                    {
                        $('#css-loader').append('<div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div>');
                    }
                    else
                    {
                        $('#css-loader').css('display', 'block');
                    }
                }
                
            }, 250);
            
            change_page();
            
        }); 
        
    });
    
    $(".closeBtn").unbind('click');
    $('.closeBtn').click(function(){
        
        if($(this).attr("id") == "log_reg_close_btn")
        {
            $('#sign_cloud').fadeOut(350, function(){
                
                $('#bg_blur').fadeOut(350, function(){
                    $('#menu, #content').fadeIn(500, function(){
                        
                        $('#registry_captcha_loader').empty();
                        
                    });
                });
                    
                var value = 'header("Refresh:0");';

                $.get('pages/aktualnosci.php', { transporter:value }, function(data){ 

                    $('#deep_content').empty().append(data).delay(100).fadeIn(250);

                    var which = 'aktualnosci_btn';

                    change_active();

                    function change_active()
                    {
                        $('#'+last_clicked).removeClass('active');
                        $('#'+which).addClass('active');
                        last_clicked = which;
                    }

                });

                $('#incorrect_pass_text').fadeOut(50);

                $('#rejestracja').fadeOut(50);
                $('#logowanie').fadeIn(50);

                $('#after_login').fadeOut(50);

                $('#confirm_account').empty();

                $("input[type='text']").val('');
                $("input[type='password']").val('');
                $("input[type='number']").val('');
                $("input[type='email']").val('');
                $('#haslo_input, #haslo2_input').css({"background-color": "rgb(51, 64, 87)"});
                $('#checkbox_input').prop('checked', false);
                grecaptcha.reset();
                ifchecked = 0;
                if(typeof CaptchaInterval != 'undefined') 
                {
                    clearInterval(CaptchaInterval);
                }
            });
        }

        if($(this).attr("id") == "info_close_btn")
        {
            $('#info_cloud').fadeOut(350, function(){
                $('#bg_blur').fadeOut(200, function(){
                    $('#menu, #content').fadeIn(500);
                });
            });
        }
        
        if($(this).attr("id") == "mini_info_close_btn")
        {
            $('#mini_info_cloud').fadeOut(350, function(){
                $('#bg_blur').fadeOut(200);
            });
        }
        
    });
    
    //$("#logout_btn").unbind('click');
    //$('#logout_btn').click(logout);
    
    $("#logout_btn").unbind('click');
    $('#logout_btn').click(function(){

        logout_by_click = true;

        logout();

    });
    
    $("#no_acc_btn").unbind('click');
    $('#no_acc_btn').on('click', function(){
        
        //$('#registry_captcha_loader').append('<div id="gcaptcha" class="g-recaptcha" data-sitekey="6LcmZxsTAAAAANDzjKAe7PftEbGOiBZRSLA5_cyW"></div>');
        
        $('#logowanie').fadeOut(500, function(){
            
            $('#rejestracja').fadeIn(500);
            
        });
    });
    
    $('#no_pass_btn').unbind('click');
    $('#no_pass_btn').on('click', function(){
       
        $('#logowanie').fadeOut(500, function(){
            
            $('#after_login').empty().append('Podaj adres email, do którego przypisane jest Twoje konto:<br /><form><input id="no_pass_email_input" class="login_text_input" type="text" name="check_email" required><input id="check_email_btn" class="login_btn" name="check_email_btn" type="submit" value="Wyślij"></form><script src="JS/no_password.js"></script>').delay(50).fadeIn(500);
            
        });  
        
    });
    
    $('#gobacklogin_btn').unbind('click');
    $('#gobacklogin_btn').on('click', function(){
        
        $("input[type='password']").val('');
        $('#after_login').fadeOut(500, function(){

            $('#logowanie').fadeIn(500);

        });
    });
    
    $('#goback_btn').unbind('click');
    $('#goback_btn').on('click', function(){
        
        $('#confirm_account').fadeOut(500, function(){
            grecaptcha.reset();
            ifchecked = 0;
            checkCaptcha();
            $('#rejestracja').fadeIn(500);

        });
    });
    
    $('#contact_goback_btn').unbind('click');
    $('#contact_goback_btn').on('click', function(){
        
        $('#deep_content').fadeOut(200, function(){
            
            grecaptcha.reset();
            var value = 'header("Refresh:0");';
            $.get('pages/kontakt.php', { transporter:value }, function(data){ 

                $('#deep_content').empty().append(data).fadeIn(300);  
            });
            
        });
        
    });
    
    $('#gobackconfirm_btn').unbind('click');
    $('#gobackconfirm_btn').on('click', function(){
        
        $('#confirm_account').fadeOut(500, function(){
            $('#conf_code_input').val('');
            $('#confirm_account').empty().append('Wpisz kod aktywacyjny, który wysłaliśmy na podany przez Ciebie adres email:<br /><input id="conf_code_input" class="login_text_input" type="text" name="conf_code"><input id="conf_code_btn" class="login_btn" name="confirm" type="submit" value="Aktywuj"><script src="JS/code_confirm.js"></script>').fadeIn(500);
        });
    });
    
    $('#gobackconfirmlogin_btn').unbind('click');
    $('#gobackconfirmlogin_btn').on('click', function(){
        
        $('#after_login').fadeOut(500, function(){
            $('#conf_code_input').val('');
            $('#after_login').empty().append('Wpisz kod aktywacyjny, który wysłaliśmy na podany przez Ciebie adres email:<br /><input id="conf_code_input" class="login_text_input" type="text" name="conf_code"><input id="conf_code_login_btn" class="login_btn" name="confirm" type="submit" value="Aktywuj"><script src="JS/code_confirm.js"></script>').fadeIn(500);
        });
    });
    
    $('#gobackconfirmpass_btn').unbind('click');
    $('#gobackconfirmpass_btn').on('click', function(){
        
        $('#after_login').fadeOut(500, function(){
            $('#conf_pass_code_input').val('');
            $('#after_login').empty().append('Wpisz kod potwierdzający, który wysłaliśmy na podany przez Ciebie adres email:<br /><input id="conf_pass_code_input" class="login_text_input" type="text" name="conf_pass_code"><input id="conf_code_login_btn" class="login_btn" name="confirm" type="submit" value="Potwierdź"><script src="JS/confirm_pass_code.js"></script>').fadeIn(500);
        });
    });
    
    $('#open_case_close_btn').unbind('click');
    $('#open_case_close_btn').on('click', function(){
        
        $('#open_case_cloud').fadeOut(350, function(){
            
            $('#bg_blur').fadeOut(350, function(){
                $('#menu, #content').fadeIn(500);
            });
            
        });
        
    });
    
    function change_page()
    {
        var value = 'header("Refresh:0");';
        var loader_interval = '';
        
        if($('#content').attr("rel") == "sklep")
        {
            if($(document).width() == 1440)
            {
                $('#content').css('padding-top', '40px');
                $('#content').css('height', '88%');
            }
            else if($(document).width() > 1440 && $(document).width() < 1800)
            {
                $('#content').css('padding-top', '40px');
                $('#content').css('height', '87.8%');
            }
            else if($(document).width() > 1800)
            {
                $('#content').css('padding-top', '40px');
                $('#content').css('height', '88.5%');
            }
            else if($(document).width() < 1440 && $(document).width() > 1350)
            {
                $('#content').css('padding-top', '40px');
                $('#content').css('height', '87%');
            }
            else if($(document).width() < 1350)
            {
                $('#content').css('padding-top', '40px');
                $('#content').css('height', '87.2%');
            }
            
        }
        else
        {
            if($('#content').css('height') != '92%')
            {
                $('#content').css('padding', '5px');
                $('#content').css('height', '92%');
            }
        }
        
        if($('#content').attr("rel") == "aktualnosci")
        {
            ile = 3;
            
            $.get('pages/aktualnosci.php', { transporter:value }, function(data){ 
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                    
            });
        }
        else if($('#content').attr("rel") == "panel_klienta")
        {
            $.get('pages/panel_klienta.php', { transporter:value }, function(data){ 
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                
            });
        }
        else if($('#content').attr("rel") == "zagraj")
        {
            $.get('pages/zagraj.php', { transporter:value }, function(data){ 
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                
            });
        }
        else if($('#content').attr("rel") == "nagrody")
        {
            $.get('pages/nagrody.php', { transporter:value }, function(data){ 
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                
            });
        }
        else if($('#content').attr("rel") == "kontakt")
        {
            $.get('pages/kontakt.php', { transporter:value }, function(data){ 
                
                //$('#deep_content').empty().append(data + '<script src="https://www.google.com/recaptcha/api.js?onload=load_recaptcha2&render=explicit" async defer></script>').delay(100).fadeIn(200);
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                
            });
        }
        else if($('#content').attr("rel") == "panel_admina")
        { 
            $.get('pages/panel_admina.php', { transporter:value }, function(data){ 
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                
            });
        }
        else if($('#content').attr("rel") == "sklep")
        { 
            $.get('pages/sklep.php', { transporter:value }, function(data){ 
                
                $('#deep_content').empty().append(data);
                
                loader_interval = setInterval(function(){
                    
                    $('#css-loader').empty();
                    
                }, 50);
                
                
                $('#deep_content').delay(100).fadeIn(200, function(){
                    
                    setTimeout(function(){
                        
                        clearInterval(loader_interval);
                        
                    }, 500);
                    
                });
                
            });
        }
    }
    
});
