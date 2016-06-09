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

        console.log(AQIColorService.getPinPath(100));



        AllPublicDataItems.query().$promise.then(function(data){
            self.dataResourcesCount = data[0].length;
            self.allPublicData = data[0];
            angular.forEach(data[0],function(item){
                 self.addNewMarker(item.deviceId, item.latitude, item.longitude, item.label, item.loc, item.imagePath, item.type);
            });
        });

         this.markers = [];

        this.addNewMarker = function(deviceId, latitudeVal, longitudeVal, titleVal, addressLabel, imagePath, contributor){
            var newMarker = {
                id: deviceId,
                lat: latitudeVal,
                lng: longitudeVal,
                options: {
                    draggable: false,
                    icon: {
                        url: imagePath
                    }
                },
                contributor: contributor,
                title: titleVal,
                address: addressLabel,
                events: {
                   
                },
                icon: {
                    url: "/assets/images/polludron-icon.png"
                }
                // show:true;
            };
            console.log("came here i times : ");
            self.markers.push(newMarker);
        };

        $scope.markersToshow = this.markers;




        

    }
})();
