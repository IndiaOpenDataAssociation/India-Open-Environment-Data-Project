(function() {
    'use strict';

    angular.module('app')
        .directive('confirmationModal', function() {
            return {
                link: function(scope, elem, attr) {
                    var modalContent = elem.parent();
                    // var modalDialog = elem.parent().parent();
                    // modalContent.css({
                    //     'width': '100%',
                    //     'border-radius': '0px',
                    //     'float': 'left'
                    // });
                    // modalDialog.css({
                    //     'margin-top': '0px',
                    //     'width': '100%',
                    //     'border-radius': '0px'
                    // });
                }
            };
        });
})();
