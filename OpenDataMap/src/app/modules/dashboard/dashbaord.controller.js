(function() {
    'use strict';

    angular.module('dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    function DashboardCtrl(AQIColorService, AllAQIDataItems,RealtimeGraphFactory,
     $cookies, $state, FieldsDataItems, AnalyticsDataItems, FieldsService, DeviceDataItems,
      AllPublicDataItems, $timeout,$document,$location,$scope, $rootScope, $window, $moment) 
    {
        var self = this;
        self.selectedDevice = null;
FieldsDataItems
        angular.extend($scope, {
            india: {
                lat:22,
                lng:73,
                zoom:5
            },
             defaults: {
                    tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
                    zoomControlPosition: 'topright',
                    tileLayerOptions: {
                        opacity: 0.9,
                        detectRetina: true,
                        reuseTiles: true,
                    },
                    scrollWheelZoom: true
            }
            });


        

    }
})();
