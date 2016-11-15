(function() {
    'use strict';

    angular.module('dashboard')
        .factory('AllPublicDataItems', AllPublicDataItems);

    function AllPublicDataItems($resource, $cookies, $state, config) {
        return $resource(config.api + 'all/public/devices' , {
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
            }
        });
    }

    
})();
