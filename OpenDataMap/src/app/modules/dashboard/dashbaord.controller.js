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

        self.cities = [
        {                      
                     "city": "Agra",
                     "latitude" : 27.1767,
                     "longitude" : 78.0081
                     },
                    {
                     "city": "Bengaluru",
                     "latitude" : 12.9716,
                     "longitude" : 77.5946
                     },
                    {
                     "city": "Chandrapur",
                     "latitude" : 20.2095,
                     "longitude" : 79.5603
                     },
                    {
                     "city": "Chennai",
                     "latitude" : 13.0827,
                     "longitude" : 80.2707
                     },
                    {
                     "city": "Delhi",
                     "latitude" : 28.6139,
                     "longitude" : 77.2090
                     },
                    {
                     "city": "Faridabad",
                     "latitude" : 28.4089,
                     "longitude" : 77.3178
                     },
                    {
                     "city": "Gaya",
                     "latitude" : 24.7955,
                     "longitude" : 84.9994
                     },
                    {
                     "city": "Gurgaon",
                     "latitude" : 28.4595,
                     "longitude" : 77.0266
                     },
                    {
                     "city": "Haldia",
                     "latitude" : 22.0667,
                     "longitude" : 88.0698
                     },
                    {
                     "city": "Hyderabad",
                     "latitude" : 17.3850,
                     "longitude" : 78.4867
                     },
                    {
                     "city": "Jaipur",
                     "latitude" : 26.9124,
                     "longitude" : 75.7873
                     },
                    {
                     "city": "Jodhpur",
                     "latitude" : 26.2389,
                     "longitude" : 73.0243
                     },
                    {
                     "city": "Kanpur",
                     "latitude" : 26.4499,
                     "longitude" : 80.3319
                     },
                    {
                     "city": "Kolkata",
                     "latitude" : 22.5726,
                     "longitude" : 88.3639
                     },
                    {
                     "city": "Lucknow",
                     "latitude" : 26.8467,
                     "longitude" : 80.9462
                     },
                    {
                     "city": "Mumbai",
                     "latitude" : 19.0760,
                     "longitude" : 72.8777
                     },
                    {
                     "city": "Muzaffarpur",
                     "latitude" : 26.1209,
                     "longitude" : 85.3647
                     },
                    {
                     "city": "Nagpur",
                     "latitude" : 21.1458,
                     "longitude" : 79.0882
                     },
                    {
                     "city": "Nashik",
                     "latitude" : 19.9975,
                     "longitude" : 73.7898
                     },
                    {
                     "city": "Panchkula",
                     "latitude" : 30.6942,
                     "longitude" : 76.8606
                     },
                    {
                     "city": "Patna",
                     "latitude" : 25.5941,
                     "longitude" : 85.1376
                     },
                    {
                     "city": "Pune",
                     "latitude" : 18.5204,
                     "longitude" : 73.8567
                     },
                    {
                     "city": "Rohtak",
                     "latitude" : 28.8955,
                     "longitude" : 76.6066
                     },
                    {
                     "city": "Solapur",
                     "latitude" : 17.6599,
                     "longitude" : 75.9064
                     },
                    {
                     "city": "Varanasi",
                     "latitude" : 25.3176,
                     "longitude" : 82.9739
                    }
         ];
        self.selectedCity = '0';
        self.selectCity = function(){
            if(self.selectedCity == '0'){
                $rootScope.center.lat = 22.9734;
                $rootScope.center.lng = 78.6569;
                $rootScope.center.zoom = 5;
            }
            angular.forEach(self.cities, function(item){
                if(item.city == self.selectedCity){
                    $rootScope.center.lat = item.latitude;
                    $rootScope.center.lng = item.longitude;
                    $rootScope.center.zoom = 9;
                }
            });
        };  




        angular.extend($rootScope, {
            center: {
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
                item.imagePath = AQIColorService.getPinPath(item.aqi);
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
                    iconUrl: imagePath
                }
                // show:true;
            };
            console.log("came here i times : ");
            self.markers.push(newMarker);
        };

        $scope.markersToshow = this.markers;



      


        

    }
})();
