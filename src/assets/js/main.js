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
    baguetteBox.run('.home-top', {
        animation: 'fadeIn',
        noScrollbars: true,
        captions: function(element) {
            // console.log($(element).attr('data-title'));
            return $(element).attr('data-title');
        }
    });
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