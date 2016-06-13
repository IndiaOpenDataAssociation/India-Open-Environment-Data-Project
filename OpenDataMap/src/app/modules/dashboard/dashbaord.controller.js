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
                    $rootScope.center.zoom = 10;
                }
            });
        };  




        angular.extend($rootScope, {
            center: {
                lat:22.9734,
                lng:78.6569,
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

        this.selectedAQI = 0;
        this.dataResourcesCount = 0;

        AllPublicDataItems.query().$promise.then(function(data){
            // self.dataResourcesCount = data[0].length;
            self.allPublicData = data[0];
            angular.forEach(data[0],function(item){
                item.imagePath = AQIColorService.getPinPath(item.aqi);
                self.addNewMarker(item.deviceId, item.latitude, item.longitude, item.label, item.loc, item.imagePath, item.type);
                self.dataResourcesCount = self.dataResourcesCount+1;
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

        $scope.events = {
            markers: {
                enable: ['touchend','click','mouseover']
            }
        }

        // this.markerClicked = function(marker, deviceId, deviceLabel, deviceAddr, contributor){
        //     deviceId = deviceId.replace(/ /g,'');
        //     self.selectedDeviceId = deviceId;
        //     self.initializeGraphColors();
        //     // marker.show=true;
        //     //marker.options.icon = 
        //     self.getSelectedDeviceData(deviceId);
        //     self.selectedModalType = 'daily';
        //     self.analyticsClicked = false;
        //     self.selectedMarker = marker;
        //     self.selectedDeviceData = {}; 
        //     self.updateSelectedData(deviceLabel, deviceAddr, contributor);
        // };


        var w = angular.element($window);
        $scope.viewPortHeight = w.height() - 164;

        this.windowWidth = w.width();
        this.graphWidth = (this.windowWidth/4) - 40;



        this.lastUpdatedTime = null;
        this.selectedDeviceLabel = "An India Open-Data Initiative";
        this.selectedDeviceAddr = null;
        this.deviceDataFetched = false;
        this.selectedDeviceData = {};
        this.selectedModalType = 'home';
        this.analyticsClicked = false;


        $scope.$on('leafletDirectiveMarker.click', function markerClicked(e, args) {
            console.log(e);
            console.log(args.model);
            args.model.id = args.model.id.replace(/ /g,'');
            self.selectedDeviceId = args.model.id;
            self.initializeGraphColors();
            // marker.show=true;
            //marker.options.icon = 
            self.getSelectedDeviceData(args.model.id);
            self.selectedModalType = 'daily';
            self.analyticsClicked = false;
            self.selectedMarker = args.model;
            self.selectedDeviceData = {}; 
            self.updateSelectedData(args.model.title, args.model.address, args.model.contributor);
        });


        this.updateSelectedData = function(deviceLabel, address, type){
            self.selectedDeviceLabel = deviceLabel;
            self.selectedDeviceAddr = type;
        };


         this.changeModalType = function(type){
            if(self.selectedDeviceId !== 0){
                if(type == 'analytics'){
                    self.selectedDeviceLabel = self.selectedMarker.title;
                    self.selectedDeviceAddr = self.selectedMarker.contributor;
                    if(self.selectedDeviceId !== 0){
                        if(self.analyticsClicked){
                        } else {
                            self.getDailyAnalyticsData(self.selectedDeviceId);
                        }
                    }
                } else if (type == 'daily'){
                    self.selectedDeviceLabel = self.selectedMarker.title;
                    self.selectedDeviceAddr = self.selectedMarker.contributor;
                    if(self.selectedDeviceId === 0){
                        self.initializeGraphData();
                    }
                    
                } else if (type == 'home') {
                    self.selectedDeviceLabel = "An India Open-Data Initiative";
                    self.selectedDeviceAddr = null;
                } else {}
                self.selectedModalType = type;
            }
        };

        this.closeModalWindow = function(){
            self.deviceDataFetched = null;
        };

        this.updateSelectedData = function(deviceLabel, address, type){
            self.selectedDeviceLabel = deviceLabel;
            self.selectedDeviceAddr = type;
        };



        this.activityArray = null;

        //called from marker markerClicked
        this.getSelectedDeviceData = function(deviceId){
            var _tempTime;
            DeviceDataItems.query({'deviceid':deviceId}).$promise.then(function(data){
                // self.selectedDeviceData = data[0].payload.d;
                _tempTime = data[0].payload.d.t * 1000;
                self.lastUpdatedTime = $moment(_tempTime).local().format('DD-MM-YY h:mm a');
                self.selectedDevice = deviceId;
                data[0].aqi = parseInt(data[0].aqi);
                data[0].aqi = Math.floor(data[0].aqi);
                self.selectedAQI = data[0].aqi;
                self.graphColor = AQIColorService.getColorVal(self.selectedAQI);
                self.visibleArea = AQIColorService.getVisibilityPercentage(self.selectedAQI);
                self.selectedAQILabel = AQIColorService.getLabel(self.selectedAQI);
                self.activityArray = AQIColorService.getActivityArray(self.selectedAQI);
                self.socialShareSentence = "I just discovered the air quality of "+self.selectedDeviceLabel+" is "+self.selectedAQI+" ("+self.selectedAQILabel+"). #KnowWhatYouBreathe";
                self.setGraphColors();
                self.calculatePercentage(data[0].payload);
                angular.forEach(data[0].payload.d,function(value, key){
                    value = Math.floor(value);
                    self.selectedDeviceData[key] = value;
                });
                self.deviceDataFetched = true;
            });
        };

        this.calculatePercentage = function(payload){
            if(payload.d.g1){
                self.g1percen = parseInt(payload.d.g1) / 20;
                self.g1percen = Math.floor(self.g1percen);
                self.g1percen = "p"+self.g1percen;
            }
            if(payload.d.g2){
                self.g2percen = parseInt(payload.d.g2) / 0.1;
                self.g2percen = Math.floor(self.g2percen);
                self.g2percen = "p"+self.g2percen;
            }
            if(payload.d.g3){
                self.g3percen = parseInt(payload.d.g3) / 0.1;
                self.g3percen = Math.floor(self.g3percen);
                self.g3percen = "p"+self.g3percen;
            }
            if(payload.d.g4){
                self.g4percen = parseInt(payload.d.g4) / 0.1;
                self.g4percen = Math.floor(self.g4percen);
                self.g4percen = "p"+self.g4percen;
            }
            if(payload.d.p1){
                self.p1percen = parseInt(payload.d.p1) / 5;
                self.p1percen = Math.floor(self.p1percen);
                self.p1percen = "p"+self.p1percen;
            }
            if(payload.d.p2){
                self.p2percen = parseInt(payload.d.p2) / 10;
                self.p2percen = Math.floor(self.p2percen);
                self.p2percen = "p"+self.p2percen;
            }
            if(payload.d.temp){
                self.temppercen = parseInt(payload.d.temp) / 1;
                self.temppercen = Math.floor(self.temppercen);
                if(self.temppercen > 100){
                    self.temppercen = 100;
                }
                self.temppercen = "p"+self.temppercen;
            }
            if(payload.d.hum){
                self.humpercen = parseInt(payload.d.hum) / 1;
                self.humpercen = Math.floor(self.humpercen);
                self.humpercen = "p"+self.humpercen;
            }
        };


        this.setGraphColors = function(){
            if(self.visibleArea == 2){
                self.graphColor1 = self.graphColor;
            } else if (self.visibleArea == 3){
                self.graphColor1 = self.graphColor;
                self.graphColor2 = self.graphColor;
            } else if (self.visibleArea == 4){
                self.graphColor1 = self.graphColor;
                self.graphColor2 = self.graphColor;
                self.graphColor3 = self.graphColor;
            } else if (self.visibleArea == 5){
                self.graphColor1 = self.graphColor;
                self.graphColor2 = self.graphColor;
                self.graphColor3 = self.graphColor;
                self.graphColor4 = self.graphColor;
            } else if (self.visibleArea == 6){
                self.graphColor1 = self.graphColor;
                self.graphColor2 = self.graphColor;
                self.graphColor3 = self.graphColor;
                self.graphColor4 = self.graphColor;
                self.graphColor5 = self.graphColor;
            } else if (self.visibleArea == 7){
                self.graphColor1 = self.graphColor;
                self.graphColor2 = self.graphColor;
                self.graphColor3 = self.graphColor;
                self.graphColor4 = self.graphColor;
                self.graphColor5 = self.graphColor;
                self.graphColor6 = self.graphColor;
            }
        };

        this.initializeGraphColors = function(){
            self.graphColor1 = "transparent";
            self.graphColor2 = "transparent";
            self.graphColor3 = "transparent";
            self.graphColor4 = "transparent";
            self.graphColor5 = "transparent";
            self.graphColor6 = "transparent";
        };

        this.initializeGraphColors();

        this.initializeGraphData = function(){
            self.aqiGraphData = [];
            self.aqiAverage = [];
            self.aqiGraph = new RealtimeGraphFactory.getAreaGraph();
        };

        this.initializeGraphData();
        this.currentAverageAQI = 0;
        this.getDailyAnalyticsData = function(deviceId){
            var _tempTime;
            self.initializeGraphData();
            AnalyticsDataItems.query({deviceid: deviceId}).$promise.then(function(data){
                angular.forEach(data, function(item){
                    self.currentAverageAQI = (item.aqi + self.currentAverageAQI) / 2;
                    self.storeDataToGraph(item.payload.d.t, item.aqi);
                    self.analyticsClicked = true;
                });
                self.associateGraphData();
            });
        };

        //sort array 
        this.sortRealTimeData = function(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        };

        //store data to graph array
        this.storeDataToGraph = function(time, value){
            time = parseInt(time);
            time = time * 1000;
            var d = new Date();
            var n = d.getTimezoneOffset();
            n = Math.abs(n);
            time = parseInt(time) + (n * 60 * 1000);
            //time = time + 475200;
            value = parseInt(value);
            length = self.aqiGraphData.length;
            self.aqiGraphData.push([time, value]);
            self.aqiAverage.push(parseInt(value));
        };

        //sort 2d array
        this.sortGraphData = function(a, b) {
            if (a[0] === b[0]) {
                return 0;
            }
            else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        };

        //graph color
        this.graphColor = '#ffffff';

        //associate data to graph
        this.associateGraphData = function(){
            self.aqiGraphData.sort(self.sortGraphData);
            self.aqiGraph.series[0].data = self.aqiGraphData;
            self.aqiFinal = Math.max.apply(Math, self.aqiAverage);
            if(self.graphWidth > 0){
                self.aqiGraph.options.chart.width = self.graphWidth;
            }
            self.currentAverageAQI = Math.floor(self.currentAverageAQI);
            self.aqiGraph.options.title.text = "Max AQI : "+self.aqiFinal;
            //self.aqiGraph.options.title.text = "Average AQI : "+self.currentAverageAQI;
        };



      


        

    }
})();
