(function() {
    'use strict';

    angular
        .module('community')
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider, $urlRouterProvider, config) {
        $stateProvider
            .state('community', {
                abstract: true,
                url: "/community",
                template: '<ui-view></ui-view>'
            })
            .state('community.index', {
                url: '/',
                templateUrl: config.moduleDir + 'community/views/community.html',
                controller: 'CommunityController',
                controllerAs: 'vm'
            });
    }

})();
