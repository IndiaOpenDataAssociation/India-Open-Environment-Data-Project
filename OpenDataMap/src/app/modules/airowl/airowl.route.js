(function() {
    'use strict';

    angular
        .module('airowl')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('airowl', {
                abstract: true,
                url: "/airowl",
                template: '<ui-view></ui-view>'
            })
            .state('airowl.index', {
                url: '/',
                templateUrl: config.moduleDir + 'airowl/views/airowl.html',
                controller: 'AirOwlController',
                controllerAs: 'vm'
            });
    }

})();
