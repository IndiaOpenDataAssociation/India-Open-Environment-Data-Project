(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config(uiGmapGoogleMapApiProvider, $httpProvider, $validationProvider, $tooltipProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
        $validationProvider.setErrorHTML(function(msg) {
            return '';
        }).setSuccessHTML(function(msg) {
            return '';
        });  
        uiGmapGoogleMapApiProvider.configure({
              key: 'AIzaSyBr3jBMT0Q4j0TnWxajkWt159n5lROYsh0'
        });
    }
})();
