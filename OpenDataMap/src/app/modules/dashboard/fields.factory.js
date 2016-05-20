(function() {
    'use strict';

    angular.module('dashboard')
        .factory('FieldsDataItems', FieldsDataItems);

    function FieldsDataItems($resource, $cookies, $state, config) {
        return $resource(config.api + 'fields', {
            }, {
            update: {
                method: 'POST' // this method issues a POST request
            },
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(data, headersGetter) {
                    var parsed = JSON.parse(data);
                    return parsed.fields;
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
