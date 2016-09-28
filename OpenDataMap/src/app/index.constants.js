(function() {
    'use strict';

    angular
        .module('config', [])
        .constant('config', {
            moduleDir: 'app/modules/',
            api: 'https://openenvironment.p.mashape.com/'
        });
})();
