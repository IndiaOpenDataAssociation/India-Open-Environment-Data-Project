(function() {
    'use strict';

    angular
        .module('config', [])
        .constant('config', {
            moduleDir: 'app/modules/',
            api: 'http://api.airpollution.online/'
        });
})();
