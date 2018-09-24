$(document).ready(function() {
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
});