(function() {
    'use strict';

    angular
        .module('dashboard')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('dashboard', {
                abstract: true,
                url: "/dashboard",
                template: '<ui-view></ui-view>'
            })
            .state('dashboard.index', {
                url: '/',
                templateUrl: config.moduleDir + 'dashboard/views/dashboard.html',
                controller: 'DashboardCtrl',
                controllerAs: 'vm'
            });
    }

})();
