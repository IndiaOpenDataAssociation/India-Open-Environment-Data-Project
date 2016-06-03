(function() {
    'use strict';
    var updateDesignContexts = function($state, $timeout) {
        //design studio box css

        var countedHeight = $(window).height() - 120;
        $('.design-content-box').css('min-height', countedHeight + 'px');
        $('.design-content-box').find('.design-operation-area').css('min-height', countedHeight + 'px');


        // nav bar collapse thing on resize
        var width;
        if ($(window).width() >= 768) {
            width = $(window).width();
        }
        if ($('body').hasClass('mini-navbar')) {
            $timeout(function() {
                $('.content,.add-region-box,.beacon-box,.add-beacon-box').css('width', width - 100);
            }, 100);
        } else {
            if (!$state.includes('design')) {
                $('.content,.add-region-box,.beacon-box,.add-beacon-box').css('width', '');
            } else {
                $('.content,.add-region-box,.beacon-box,.add-beacon-box').css('width', width - $('.menu').width());
            }
        }
    };

    angular
        .module('app')
        .run(runBlock);

    /** @ngInject */
    function runBlock($rootScope, $state, config, $FB, $cookies, $http, AuthenticationService, $timeout) {
        AuthenticationService.setUser();
        $rootScope.config = config;
        $rootScope.$state = $state;
        $FB.init('1143339922353483');
    }

})();
