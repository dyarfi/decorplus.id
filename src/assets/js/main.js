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
});