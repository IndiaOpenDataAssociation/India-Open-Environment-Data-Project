(function() {
    'use strict';

    angular.module('app')
        .service('Uploader', Uploader);

    function Uploader(Upload, config, $q, AuthenticationService) {
        this.upload = function(file, params, fileParamName) {
            var defer = $q.defer();
            Upload.upload({
                url: config.api + 'upload', // upload.php script, node.js route, or servlet url
                file: file, // single file or an array of files (array is for html5 only)
                method: 'POST',
                fields: params,
                fileFormDataName: fileParamName ? fileParamName : 'file',
                headers: {
                    'Authorization': 'Bearer ' + AuthenticationService.getToken()
                },

            }).progress(function(evt) {}).success(function(data, status, headers, config) {
                // file is uploaded successfully
                defer.resolve(data);
            }).error(function(data) {
                defer.reject(data);
            });
            return defer.promise;
        };
    }
})();
