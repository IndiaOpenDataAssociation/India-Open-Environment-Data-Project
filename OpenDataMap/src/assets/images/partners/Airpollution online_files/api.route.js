(function() {
    'use strict';

    angular
        .module('api')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('api', {
                abstract: true,
                url: "/openapi",
                template: '<ui-view></ui-view>'
            })
            .state('api.index', {
                url: '/',
                templateUrl: config.moduleDir + 'api/views/api.html',
                controller: 'ApiController',
                controllerAs: 'vm'
            });
    }

})();
