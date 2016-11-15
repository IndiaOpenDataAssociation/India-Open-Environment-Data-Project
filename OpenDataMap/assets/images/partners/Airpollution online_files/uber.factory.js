(function() {
    'use strict';

    angular.module('dashboard')
        .factory('UberDataItems', UberDataItems);

    function UberDataItems($resource, $cookies, $state, config) {
        return $resource(config.api + 'all/public/full/OZ_UBER_001?lte=:lte&gte=:gte' , {
                lte: '@lte', gte: '@gte'
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
