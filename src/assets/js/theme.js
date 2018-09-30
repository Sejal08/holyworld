;(function($){
    "use strict"
	
	
	var nav_offset_top = $('header').height() + 50; 
    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

	
	
	/*----------------------------------------------------*/
    /*  Testimonials Slider
    /*----------------------------------------------------*/
    function screenshot_slider(){
        if ( $('.screenshot_inner').length ){
            $('.screenshot_inner')({
                loop:true,
                margin: 30,
                items: 4,
                nav: false,
                autoplay: true,
                smartSpeed: 1500,
                dots:false, 
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 2,
                    },
                    576: {
                        items: 4,
                    },
                }
            })
        }
    }
    screenshot_slider();
	
	
	

})(jQuery)