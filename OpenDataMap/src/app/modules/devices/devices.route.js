(function() {
    'use strict';

    angular
        .module('devices')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('devices', {
                abstract: true,
                url: "/devices",
                template: '<ui-view></ui-view>'
            })
            .state('devices.index', {
                url: '/',
                templateUrl: config.moduleDir + 'devices/views/devices.html',
                controller: 'DevicesController',
                controllerAs: 'vm'
            });
    }

})();
