(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config(uiGmapGoogleMapApiProvider, swaggerTranslatorProvider, $httpProvider, $validationProvider, $tooltipProvider) {
        $httpProvider.interceptors.push('httpRequestInterceptor');
        $validationProvider.setErrorHTML(function(msg) {
            return '';
        }).setSuccessHTML(function(msg) {
            return '';
        });  
        uiGmapGoogleMapApiProvider.configure({
              key: 'AIzaSyBr3jBMT0Q4j0TnWxajkWt159n5lROYsh0'
        });
        swaggerTranslatorProvider
            .setLanguage('en')
            .addTranslations('en', {
                appTitle: 'angular-swagger-ui sample',
                explore: 'Explore',
                loading: 'loading...',
                error: 'Failed to generate Swagger-UI: {{code}} {{message}}',
                french: 'french',
                english: 'english'
            })
            .addTranslations('fr', {
                appTitle: 'Exemple angular-swagger-ui',
                explore: 'Explorer',
                loading: 'Chargement ...',
                error: 'Impossible de générer Swagger-UI: {{code}} {{message}}',
                french: 'français',
                english: 'anglais'
            });
    }
})();
