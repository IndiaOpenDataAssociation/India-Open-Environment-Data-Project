(function() {
    'use strict';

    angular.module('app')
        .controller('headerCtrl', HeaderCtrl);

    function HeaderCtrl($rootScope, $timeout, $scope, AuthenticationService, $state, $cookies) {
        var self = this;
        $scope.logout = function(){
            localStorage.setItem('curDeviceId',"");
            localStorage.setItem('userId',"");
            localStorage.setItem('devicesData',"");
            localStorage.setItem('fieldsData',"");
            $state.go('login.index');
        };

        this.updateMap = function(){
            if(self.location.geometry){
                $rootScope.latitude = self.location.geometry.location.lat();
                $rootScope.longitude = self.location.geometry.location.lng();
                $rootScope.map.center.latitude = self.location.geometry.location.lat();
                $rootScope.map.center.longitude = self.location.geometry.location.lng();
            }  
        };
    }
})();
