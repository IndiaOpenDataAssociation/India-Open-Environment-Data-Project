(function() {
    'use strict';

    angular
        .module('config', [])
        .constant('config', {
            moduleDir: 'app/modules/',
            api: 'http://oizomtub.eu-gb.mybluemix.net/',
            username: 'zomato@foo.com',
            password: 'zomato',
            defaultAccent: '#ec1c24'
        });
})();
