var host_url = document.location.hostname;
// console.log(host_url);
$(document).ready(function() {
    /* ==============================================
    Preloader
    =============================================== */
    // Will first fade out the loading animation
    $("#loading-animation").fadeOut();
    // Will fade out the whole DIV that covers the website.
    $("#preloader").delay(600).fadeOut("slow");
    var fixed_menu = $('.fixed-menu');
    // Button to Open Fixed Menu
    $('.button-burger a[class^=btn]').on('click',function () {
        fixed_menu.toggleClass('invisible');
        $(this).toggleClass('toggled');
        $('.button-close a[class^=btn]').toggleClass('toggled');
    });
    // Button to Close Fixed Menu
    $('.button-close a[class^=btn]').on('click',function () {
        fixed_menu.toggleClass('invisible');
        $(this).toggleClass('toggled');
        $('.button-burger a[class^=btn]').toggleClass('toggled');
    });
    // Slick Carousel on reviews
    $('.slick-carousel').slick({        
        centerPadding: 0,
        focusOnSelect: false,
        autoplay: true,
        autoplaySpeed: 2500,
        infinite: true,
        arrows: true,
        speed: 2000,
        centerMode: true,
        fade: true,
        cssEase: 'ease',
        easing: 'ease-in-out',
        pauseOnFocus: false,
        pauseOnHover: false,
        waitForAnimate: false,
        nextArrow: '<a href="javascript:;" class="carousel-control-next h3" data-slide="prev"><i class="oi oi-chevron-right"></i></a>',
        prevArrow: '<a href="javascript:;" class="carousel-control-prev h3" data-slide="next"><i class="oi oi-chevron-left"></i></a>'
    });
    // Datepicker
    $('#datetimepicker, #inlineFormInputGroupDate').datetimepicker({ 
        uiLibrary: 'bootstrap4',
        datepicker: { header:false, showOtherMonths: true, calendarWeeks: true },
        footer: true, modal: true 
    });
    // BaguetteBox
    baguetteBox.run('.gallery-list__link', {
        animation: 'fadeIn',
        noScrollbars: true,
        captions: function(element) {
            // console.log($(element).attr('data-title'));
            return $(element).attr('data-title');
        }
    });
    /*
    baguetteBox.run('.home-top', {
        animation: 'fadeIn',
        noScrollbars: true,
        captions: function(element) {
            // console.log($(element).attr('data-title'));
            return $(element).attr('data-title');
        }
    });
    */
    // Scroll to element
    $('.scrollTo').on('click', function (event) {
        $('.button-close a').click();
        if($(this).attr('href').split('#')[1]) {
            var $el = $(this).attr('href').match(/(#[a-z0-9][a-z0-9\-_]*)/ig)[0];
            if ($($el).offset()) {
                $('html, body').animate({
                    scrollTop: ($($el).offset().top - 50)
                },1900,'swing');
            }
        }
        event.preventDefault();
    });
    // Scroll to Top
    // declare variable
    var scrollTop = $(".scrollTop");
    $(window).scroll(function() {
        // declare variable
        var topPos = $(this).scrollTop();
        // if user scrolls down - show scroll to top button
        if (topPos > 200) {
            $(scrollTop).css({"opacity":"1","z-index":"1",'bottom':'16px'});
        } else {
            $(scrollTop).css({"opacity":"0","z-index":"-1",'bottom':'-70px'});
        }
    }); // scroll END

    //Click event to scroll to top
    $(scrollTop).click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1900);
        return false;
    }); // click() scroll top EMD

    $('#form-contact').submit(function () {
        return false;
    })

    // Form Validations
    window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var $form_contact = $('#form-contact');
        var $submit_contact = $form_contact.find('[type=submit]');
        var $form_booking = $('#form-booking');
        var $inputs = document.getElementsByClassName('needs-validation');
        // VALIDATES Contact Form
        // Loop over them and prevent submission
        var validates_contact = Array.prototype.filter.call($inputs, function(form_contact) {
            form_contact.addEventListener('submit', function(event) {
                if (form_contact.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form_contact.classList.add('was-validated');
                // Prepared for post to server
                if (form_contact.checkValidity() && $form_contact.hasClass('was-validated')) {
                    $form_contact.find('button[name=submit]').prop("disabled",true);
                    $submit_contact.html('<i class="oi oi-x small spin"></i>');
                        axios({
                            headers: {
                                'Access-Control-Allow-Origin': '*',
                                'X-Requested-With': 'XMLHttpRequest',
                                'content-type': 'application/x-www-form-urlencoded'//,
                                //'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                            },
                            crossdomain: true,
                            method: 'post',
                            url: 'contact',
                            data: $form_contact.serialize()
                        })
                        .then(function(response) {
                            console.log(response.status);
                            $submit_contact.html('Submit');
                            if (response.status == 200 || response.status == 405 && response.statusText == 'OK') {
                                var result = response.data;
                                if (result.code == 0) {
                                    $('#'+result.handler).find('.invalid-feedback').show().empty().html(result.message);
                                } else {
                                    $form_contact.addClass('d-none');
                                    $('.content').html('<div class="mx-auto text-danger"><h5 class="display-4">Thank you for contacting</h5></div>');
                                    setTimeout( function() { $("#BootModal").modal('hide'); window.location.reload(false); }, 900 );
                                }
                            }
                        })
                        .catch(function (error) {
                            $($form_contact).find('.invalid-feedback').show();
                            $submit_contact.html('Submit');
                        });
                    $form_contact.find('button[name=submit]').prop("disabled",false);
                }
                event.preventDefault();
            }, false);
        });
        // VALIDATES Booking Form
        // Loop over them and prevent submission
        var validates_booking = Array.prototype.filter.call($inputs, function(form_booking) {
            form_booking.addEventListener('submit', function(event) {
              if (form_booking.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
              }
              form_booking.classList.add('was-validated');
              // Prepared for post to server
              if (form_booking.checkValidity() && $form_booking.hasClass('was-validated')) {
                  $form_booking.find('button[name=submit]').prop("disabled",true);
                      axios({
                          headers: {
                              'Access-Control-Allow-Origin': '*',
                              'X-Requested-With': 'XMLHttpRequest',
                              'content-type': 'application/x-www-form-urlencoded'//,
                              //'X-CSRF-TOKEN' : document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                          },
                          crossdomain: true,
                          method: 'post',
                          url: 'contact',
                          data: $form_booking.serialize()
                      })
                      .then(function(response) {
                          console.log(response.status);
                          if (response.status == 200 || response.status == 405 && response.statusText == 'OK') {
                              var result = response.data;
                              if (result.code == 0) {
                                  $('#'+result.handler).find('.invalid-feedback').show().empty().html(result.message);
                              } else {
                                  $form_booking.addClass('d-none');
                                  $('.content').html('<div class="mx-auto text-danger"><h5 class="display-4">Thank you for contacting</h5></div>');
                                  setTimeout( function() { $("#BootModal").modal('hide'); window.location.reload(false); }, 900 );
                              }
                          }
                      })
                      .catch(function (error) {
                          $($form_booking).find('.invalid-feedback').show();
                      });
                  $form_booking.find('button[name=submit]').prop("disabled",false);
              }
              event.preventDefault();
            }, false);
        });

    }, false);

    // Initial scrollreveal
    window.sr = ScrollReveal();

    // sr.reveal('.copy-text-head', { reset:true, viewFactor: 0.6, origin: 'top', scale:'1', duration: '1000', delay:'200', distance: '12px', }, '100');
    // sr.reveal('.copy-text-sub', { reset:true, viewFactor: 0.6, origin: 'bottom', scale:'1', duration: '1000', delay:'200', distance: '12px', }, '100');
    $('.blog-post__row, .aboutus-content, .service-content, .welcome-home').each(function(i,hl){
        i = i + 1;
        sr.reveal(hl, { reset:false, viewFactor: 0.3, origin: 'bottom', scale:'1', duration: '1000', delay:'300', distance: '16px', }, '50');
        // i++;
    });
    $('.gallery-list__content').each(function(j,gl){
        j = j + 1;
        sr.reveal(gl, { reset:false, viewFactor: 0.3, origin: 'bottom', scale:'1', duration: '1000', delay:'300', distance: '16px', }, '50');
        // j++;
    });
    $('.home-top__content').each(function(k,tl){
        k = k + 1;
        sr.reveal(tl, { reset:false, viewFactor: 0.3, origin: 'right', scale:'1', duration: '1000', delay:'300', distance: '16px', }, k + '00');
        // k++;
    });
    $('.headline').each(function(l,hl){
        sr.reveal(hl, { reset:false, viewFactor: 0.3, origin: 'top', scale:'1', duration: '1000', delay:'300', distance: '16px', }, l + '00');
    });
    $('.form-contact').each(function(m,cf){
        sr.reveal(cf, { reset:false, viewFactor: 0.3, origin: 'top', scale:'1', duration: '1000', delay:'300', distance: '26px', }, m + '00');
    });

});

var transparent = true;
$(window).on('scroll',function () {
    var windscroll = $(window).scrollTop();
    // console.log(windscroll+'--');
    if (windscroll >= 100) {
        $('.section').each(function(i) {
            // console.log($(this).position().top);
            if ($(this).position().top <= (windscroll + 100)) {
                $('.menus-nav-ul li.nav-item').not('.dropdown').removeClass('active');
                $('.menus-nav-ul li.nav-item').not('.dropdown').eq(i).addClass('active');
            }
        });
    } else if (windscroll < 100) {
        $('.menus-nav-ul li.nav-item.active').not('.dropdown').removeClass('active');
        $('.menus-nav-ul li.nav-item').eq(0).not('.dropdown').addClass('active');
    } else {
        $('.menus-nav-ul li.nav-item').eq(0).not('.dropdown').addClass('active');
    }
    var $navbar = $('#navbar-top');
    var scroll_distance = $navbar.data('scroll') || 250;
    if ($(document).scrollTop() > scroll_distance) {
        if (transparent) {
            transparent = false;
            $('#navbar-top').removeClass('navbar-transparent').addClass('shadow-md');        
            $('.button-burger').css({'top':'24px'});
        }
    } else {
        if (!transparent) {
            transparent = true;
            $('#navbar-top').addClass('navbar-transparent').removeClass('shadow-md');
            $('.button-burger').css({'top':'30px'});
        }
    }
});