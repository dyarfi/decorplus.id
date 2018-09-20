$(document).ready(function() {
    var fixed_menu = $('.fixed-menu');
    // Button to Open Fixed Menu
    $('.button-burger a[class^=btn]').on('click',function () {
        fixed_menu.toggleClass('invisible');
    });
    // Button to Close Fixed Menu
    $('.button-close a[class^=btn]').on('click',function () {
        fixed_menu.toggleClass('invisible');
    });
    // Slick Carousel on reviews
    $('.slick-carousel').slick({        
        centerPadding: 0,
        focusOnSelect: false,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        speed: 1800,
        centerMode: true,
        cssEase: 'ease-in',
        easing: 'ease-in-out',
        pauseOnFocus: false,
        pauseOnHover: false,
        waitForAnimate: false,
        nextArrow: '<a href="javascript:;" class="carousel-control-next h3" data-slide="prev"><i class="oi oi-chevron-right"></i></a>',
        prevArrow: '<a href="javascript:;" class="carousel-control-prev h3" data-slide="next"><i class="oi oi-chevron-left"></i></a>'
    });
});