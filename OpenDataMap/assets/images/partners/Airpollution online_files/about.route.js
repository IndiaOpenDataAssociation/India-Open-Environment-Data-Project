(function() {
    'use strict';

    angular
        .module('about')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('about', {
                abstract: true,
                url: "/about",
                template: '<ui-view></ui-view>'
            })
            .state('about.index', {
                url: '/',
                templateUrl: config.moduleDir + 'about/views/about.html',
                controller: 'AboutController',
                controllerAs: 'vm'
            });
    }

})();
