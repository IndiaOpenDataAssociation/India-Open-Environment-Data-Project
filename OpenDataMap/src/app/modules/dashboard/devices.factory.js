(function() {
    'use strict';

    angular.module('dashboard')
        .factory('DeviceDataItems', DeviceDataItems);

    function DeviceDataItems($resource, $cookies, $state, config) {
        return $resource(config.api + 'all/public/data/cur/:deviceid' , {
                deviceid: '@deviceid'
            }, {
            update: {
                method: 'POST' // this method issues a POST request
            },
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data, headersGetter) {
                    var parsed = JSON.parse(data);
                    return parsed;
                }
            },
            basicInfo: {
                method: 'GET',
                isArray: false,
                transformResponse: function(data, headersGetter) {
                    var parsed = JSON.parse(data);
                    return parsed;
                }
            }
        });
    }

    
})();
