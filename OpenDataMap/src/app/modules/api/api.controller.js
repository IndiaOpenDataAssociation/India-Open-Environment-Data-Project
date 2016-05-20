(function() {
    'use strict';

    angular.module('api')
        .controller('ApiController', ApiController);

    function ApiController($scope, $rootScope, swaggerTranslator) {
    	// init form
        $scope.isLoading = false;
        $scope.url = $scope.swaggerUrl = 'http://jimishparekh.github.io/swagger.json';
        // error management
        $scope.myErrorHandler = function(data, status){
            alert(swaggerTranslator.translate('error', {
                message: data,
                code: status
            }));
        };
        $scope.setFr = function() {
            swaggerTranslator.useLanguage('fr');
        };
        $scope.setEn = function() {
            swaggerTranslator.useLanguage('en');
        };
        $scope.getLang = function() {
            return swaggerTranslator.language();
        };
    }
})();