(function() {
    'use strict';

    angular
        .module('partners')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('partners', {
                abstract: true,
                url: "/partners",
                template: '<ui-view></ui-view>'
            })
            .state('partners.index', {
                url: '/',
                templateUrl: config.moduleDir + 'partners/views/partners.html',
                controller: 'PartnerController',
                controllerAs: 'vm'
            });
    }

})();
