(function() {
    'use strict';

    angular.module('app')
        .factory('httpRequestInterceptor', function($q, $location, $rootScope, $injector) {
            var numLoadings = 0;

            return {
                request: function(config) {

                    numLoadings++;

                    // Show loader
                    //$rootScope.$broadcast("loader_show");
                    return config || $q.when(config);

                },
                response: function(response) {
                    if ((--numLoadings) === 0) {
                        // Hide loader
                        $rootScope.$broadcast("loader_hide");
                    }
                    if (response.data && (response.data.status === 400 || response.data.status === 500)) {
                        notification.error("some error occurred. please try again");
                    }

                    return response || $q.when(response);

                },
                responseError: function(response) {

                    if (!(--numLoadings)) {
                        // Hide loader
                        //$rootScope.$broadcast("loader_hide");
                    }
                    if (response.status === 401 && response.statusText === "Unauthorized") {
                        var auth = $injector.get('AuthenticationService');
                        auth.removeUser();
                        auth.setUser();
                    } else {
                        //notification.error(response.data.message, response.data.error);
                    }
                    return $q.reject(response);
                }
            };
        });
})();
