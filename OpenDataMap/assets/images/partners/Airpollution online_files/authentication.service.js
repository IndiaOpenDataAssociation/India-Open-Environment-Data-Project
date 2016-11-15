(function() {
    'use strict';

    angular.module('app')
        .service('AuthenticationService', AuthenticationService);

    function AuthenticationService($http, config, $q, $cookies, $cookieStore, $rootScope, $state) {
        this.authenticate = function(credentials) {
            var self = this;
            var defer = $q.defer();
            var payload = angular.extend({
                grant_type: 'password'
            }, credentials);
            $http.post(config.api + 'oauth/token', payload, {
                headers: {
                    authorization: 'Basic d2ViX2FkbWluX2NvbnNvbGU6d2ViX2FkbWluX2NvbnNvbGVfc2VjcmV0=',
                    'Content-Type': undefined
                },
                transformRequest: function(data) {
                    var formData = new window.FormData();
                    formData.append("username", payload.username);
                    formData.append("password", payload.password);
                    formData.append("grant_type", "password");
                    return formData;
                }
            }).success(function(data) {
                // got server response, set authorization token in default header!
                self.setUser(data);
                defer.resolve(data);
            }).error(function(data) {
                defer.reject(data);
            });
            return defer.promise;
        };

        this.getToken = function() {
            return $cookies.get('token');
        };

        this.removeUser = function() {
            // $cookies.remove('location');
            // $cookies.remove('token');
            // eraseAllCookies();
            // window.location.href="http://localhost/";
        };

        function createCookie(name,value,days) {
            if (days!==-1) {
                var date = new Date();
                date.setTime(date.getTime()+(days*24*60*60*1000));
                var expires = "; expires="+date.toGMTString();
            }
            else {
                var expiresCookies = "";
                document.cookie = name+"="+value+expiresCookies+"; path=/";
            }
        }

        

        function eraseCookie(name) {
            createCookie(name,"",-1);
        }

        function eraseAllCookies(){
            var cookies = document.cookie.split(";");
            for (var i = 0; i < cookies.length; i++){
              eraseCookie(cookies[i].split("=")[0]);
            }
        }

        this.setUser = function(data) {
            if ($cookies.get('token')) {
                $http.defaults.headers.common.authorization = "Bearer " + $cookies.get('token');

            } else if (data) {
                $cookies.put('token', data.access_token);
                $http.defaults.headers.common.authorization = "Bearer " + data.access_token;
            } else {
                // console.log("3");
                // this.authenticate({
                //     username: config.username,
                //     password: config.password
                // });
                // $cookies.remove('location');
                // $cookies.remove('token');
                // eraseAllCookies();
                // window.location.href="http://app.encircle.io/";
                return null;
            }
            if($cookies.get('token')){ 
            }   
        };
    }
})();
