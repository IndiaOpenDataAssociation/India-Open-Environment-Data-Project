function main() {

(function () {
   'use strict';

   /* ==============================================
  	Testimonial Slider
  	=============================================== */ 

    /*====================================
    Show Menu on Book
    ======================================*/

    // var startFixedSectionElem = document.getElementById("precisionMarketingSection");
    // var endFixedSectionElem = document.getElementById("inDepthAnalytics");
    // var fixedSection = document.getElementById("fixedSection");
    // var subscribeCloseBtn = document.getElementById("subscribeCloseBtn");

    // var startFixedSectionElemHeight = $(startFixedSectionElem).offset().top;
    // var endFixedSectionElemHeight =$(endFixedSectionElem).offset().top;
    // var scrolledFlag = 0;


    $(window).bind('scroll', function() {
        var navHeight = 100;
        // if(scrolledFlag == 0){
        //   if ($(window).scrollTop() > startFixedSectionElemHeight-200 && $(window).scrollTop() < endFixedSectionElemHeight) {
        //     $(fixedSection).fadeIn("fast");
        //   } else {
        //     $(fixedSection).fadeOut("fast");
        //   }
        // }
        
    });

    // subscribeCloseBtn.onclick = function(){
    //   scrolledFlag = 1;
    //   $(fixedSection).fadeOut("fast");
    // }

    $(document).ready(function(){
        var triggerBttn = document.getElementById( "nav-icon2" ),
            overlay = document.querySelector( 'div.menu-overlay' ),
            closeBttn = document.querySelector( 'span.menu-overlay-close' ),
            transEndEventNames = {
              'WebkitTransition': 'webkitTransitionEnd',
              'MozTransition': 'transitionend',
              'OTransition': 'oTransitionEnd',
              'msTransition': 'MSTransitionEnd',
              'transition': 'transitionend'
            },
            transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
            support = { transitions : Modernizr.csstransitions };

          function toggleOverlay() {
            if( classie.has( overlay, 'open' ) ) {
              classie.remove( overlay, 'open' );
              classie.add( overlay, 'close' );
              var onEndTransitionFn = function( ev ) {
                if( support.transitions ) {
                  if( ev.propertyName !== 'visibility' ) return;
                  this.removeEventListener( transEndEventName, onEndTransitionFn );
                }
                classie.remove( overlay, 'close' );
              };
              if( support.transitions ) {
                overlay.addEventListener( transEndEventName, onEndTransitionFn );
              }
              else {
                onEndTransitionFn();
              }
            }
            else if( !classie.has( overlay, 'close' ) ) {
              classie.add( overlay, 'open' );
            }
          }

          triggerBttn.addEventListener( 'click', toggleOverlay );
          closeBttn.addEventListener( 'click', toggleOverlay );
          
    });


    
    

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    });


}());


}
main();