$(function(){
    var thumbsSwiper = new Swiper(".main-visual-thumbnails", {
        slidesPerView : 4,
        freeMode : true,
        watchSlidesProgress : true,
        allowTouchMove : true,
    });
    var mainSwiper = new Swiper(".main-visual", {
        allowTouchMove : true,
        observer: true,
        observeParents: true,
        pagination : {
            el : ".bullet-pagination",
            type : 'bullets',
            clickable : true,
        },
        thumbs : {
            swiper : thumbsSwiper,
        },
    });
    var paginationFraction = new Swiper(".main-visual", {
        pagination: {
            el: ".frac-pagination",
            type: "fraction",
        },
    });
    
    mainSwiper.controller.control = paginationFraction;


});




