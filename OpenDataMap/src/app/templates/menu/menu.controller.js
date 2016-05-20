(function() {
    'use strict';

    angular.module('app')
        .controller('MenuCtrl', MenuCtrl);

    function MenuCtrl($state) {
    	var self = this;
        this.isCollapsed = true;
    }
})();