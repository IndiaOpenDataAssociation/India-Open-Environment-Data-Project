/** global routes defined here ***/

(function() {
    'use strict';
    angular.module('app')
        .config(config);

    function config($urlRouterProvider) {
        $urlRouterProvider.otherwise('/dashboard/');
    }
})();
