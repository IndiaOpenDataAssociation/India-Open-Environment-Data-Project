(function() {
    'use strict';

    angular.module('app')
        .service('KeyValueService', KeyValueService);

    
    function KeyValueService($cookies) {
        var self = this;
        this.getFieldsLabel = function(fieldKey){
            var data = null;
            var returnValue = null;
            if(fieldKey == 'noise'){
                return fieldKey;
            }
            if(localStorage.getItem('fieldsData')){
                data = localStorage.getItem('fieldsData');
                data = JSON.parse(data);
                $.each(data, function(key,value){
                    $.each(value, function(k, v){
                        if(k == 'fkey'){
                            if(v == fieldKey){
                                
                                returnValue = value.label;
                            }
                        }
                    });
                });

            } else {
                returnValue = fieldKey;
            }
            return returnValue;
        };

        this.getFieldsKey = function(fieldValue){
            var data = null;
            var returnValue = null;
            if(localStorage.getItem('fieldsData')){
                data = localStorage.getItem('fieldsData');
                data = JSON.parse(data);
                $.each(data, function(key,value){
                    $.each(value, function(k, v){
                        if(k == 'label'){
                            if(v == fieldValue){
                                returnValue = value.fkey;
                            }
                        }
                    });
                });
            } else {
                returnValue = fieldValue;
            }
            return returnValue;
        };
    }
})();
