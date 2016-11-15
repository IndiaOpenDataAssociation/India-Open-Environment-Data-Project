(function() {
    'use strict';

    angular.module('app')
        .service('FieldsService', FieldsService);

    
    function FieldsService(FieldsDataItems, $cookies) {
        var self = this;
        this.storeFieldsData = function(data) {
            if(data===null && data=== undefined){
                FieldsDataItems.query().$promise.then(function(data) {
                    if(dataLength=== null || dataLength===undefined){
                        
                    } else  {
                        //$cookies.remove('fieldsData');
                        localStorage.setItem('fieldsData', JSON.stringify(data));
                    }
                });
            } else {
                localStorage.setItem('fieldsData', JSON.stringify(data));
            }
        };

        this.getFieldsData = function(){
            var data = null;
            if ($cookies.get('fieldsData')) {
                //data = $cookies.get('fieldsData');
                data = localStorage.getItem('fieldsData');
                data = JSON.parse(data);
            }
            
            return data;
        };
    }
})();
