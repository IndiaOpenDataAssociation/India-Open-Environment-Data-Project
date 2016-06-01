(function() {
    'use strict';

    angular.module('dashboard')
        .controller('DashboardCtrl', DashboardCtrl);

    function DashboardCtrl($scope, $rootScope, $window, $moment, AQIColorService, AllAQIDataItems,RealtimeGraphFactory, $cookies, $state, FieldsDataItems, AnalyticsDataItems, FieldsService, DeviceDataItems, AllPublicDataItems, $timeout) {
        var self = this;
        self.selectedDevice = null;

        var mapObject = {
            center: {
                latitude: 23,
                longitude: 75
            },
            zoom: 9
        };

        var markerObject = {
            id: 0,
            coords: {
                latitude: undefined,
                longitude: undefined
            },
            options: {
                draggable: true
            },
            events: {}
        };
        var styleArray = [
          {
            stylers: [
              { hue: "#4fc9e8" },
              { saturation: -20 }
            ]
          },{
            featureType: "road",
            elementType: "geometry",
            stylers: [
              { lightness: 100 },
              { visibility: "simplified" }
            ]
          },{
            featureType: "road",
            elementType: "labels",
            stylers: [
              { visibility: "off" }
            ]
          }
        ];

        $scope.options = {
           styles: styleArray
        };

        $scope.clusterOptions = {
            maxZoom:11,
            styles: [{
              width: 50,
              height: 50,
              textColor: '#ffffff',
              textSize: 15,
              url:"http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerclusterer/1.0.2/images/m1.png"
            }],
            keepSpiderfied:true
        };

        $rootScope.latitude = 28.5877575;
        $rootScope.longitude = 77.21531200000004;

        $rootScope.map = {
            center: {
                latitude: $rootScope.latitude,
                longitude: $rootScope.longitude
            },
            zoom: 9,
            zoomControl: false,
            disableDefaultUI: true,
            styles: [
              {
                stylers: [
                  { hue: "#00ffe6" },
                  { saturation: -20 }
                ]
              },{
                featureType: "road",
                elementType: "geometry",
                stylers: [
                  { lightness: 100 },
                  { visibility: "simplified" }
                ]
              },{
                featureType: "road",
                elementType: "labels",
                stylers: [
                  { visibility: "off" }
                ]
              }
            ]
        };
        //$rootScope.map.setOptions(styles);
        $scope.marker = {
            id: 0,
            coords: {
                latitude: undefined,
                longitude: undefined
            },
            options: {
                draggable: true
            },
            events: {}
        };
        $scope.marker.coords.latitude = 23.022505;
        $scope.marker.coords.longitude = 72.57136209999999;
        $scope.marker.events.dragend = function(marker, eventName, args) {
            var lat = marker.getPosition().lat();
            var lon = marker.getPosition().lng();
            $scope.ngMessageEnable = false;
            $rootScope.map.center.latitude = lat;
            $rootScope.map.center.longitude = lon;
            $scope.marker.options = {
                draggable: true,
                labelAnchor: "100 0",
                labelClass: "marker-labels"
            };
        };

        this.markers = [];
        this.selectedContributor = null;
        this.selectedDeviceId = 0;
        this.imageUrl = "http://i.imgur.com/g7TTFQ5.png";
        this.addNewMarker = function(deviceId, latitudeVal, longitudeVal, titleVal, addressLabel, imagePath, contributor){
            var newMarker = {
                id: deviceId,
                coords: {
                    latitude: latitudeVal,
                    longitude: longitudeVal
                },
                options: {
                    draggable: false,
                    icon: {
                        url: imagePath
                    }
                },
                contributor: contributor,
                title: titleVal,
                address: addressLabel,
                events: {},
                icon: {
                    url: "/assets/images/polludron-icon.png"
                }
            };
            self.markers.push(newMarker);
        };

        this.showOizomDevices = true;
        this.showIODADevices = true;

        this.disableOizomDevices = function(){
            if(self.showOizomDevices){
                angular.forEach(self.markersToshow, function(item){
                    if(item.contributor == 'POLLUDRON_PUBLIC'){
                        var index = self.markersToshow.indexOf(item);
                        self.markersToshow.splice(index, 1);
                    }
                });
                self.showOizomDevices = !(self.showOizomDevices);
            } else {
                angular.forEach(self.markers, function(item){
                    if(item.contributor == 'POLLUDRON_PUBLIC'){
                        self.markersToshow.push(item);
                    }
                });
                self.showOizomDevices = !(self.showOizomDevices);
            }
        };

        this.iodaNumArray = [];

        this.disableIodaDevices = function(){
            if(self.showIODADevices){
                self.iodaNumArray = [];
                angular.forEach(self.markersToshow, function(item){
                    if(item.contributor == 'IODA'){
                        var index = self.markersToshow.indexOf(item);
                        self.iodaNumArray.push(index);
                    }
                });
                for(var i=self.iodaNumArray.length;i>-1;i--){
                    self.markersToshow.splice(self.iodaNumArray[i], 1);
                }
                self.showIODADevices = !(self.showIODADevices);
            } else {
                angular.forEach(self.markers, function(item){
                    if(item.contributor == 'IODA'){
                        self.markersToshow.push(item);
                    }
                });
                self.showIODADevices = !(self.showIODADevices);
            }
        };

        this.changeContributor = function(contributor){
            self.markersToshow = [];
            if(contributor !== null && contributor !== undefined){
                angular.forEach(self.markers, function(item){
                    if(item.contributor == contributor){
                        self.markersToshow.push(item);
                    }
                });
                self.selectedContributor = contributor;
            } else if(contributor === null){
                angular.forEach(self.markers, function(item){
                    self.markersToshow.push(item);
                });
            } else {}
        };

        // function generateIcon(number,  color) {

        //   var fontSize = 16,
        //     imageWidth = 35,
        //     imageHeight = 35;

        //   var svg = d3.select(document.createElement('div')).append('svg')
        //     .attr('viewBox', '0 0 100 100')
        //     .append('g')

          

        //   var path = svg.append('path')
        //     .attr('d', 'M1.493,13.895c-0.898-2.985,0.918-5.27,4.036-5.27h9.294c3.118,0,4.935,2.284,4.036,5.27l-7.05,23.352c-0.898,2.986-2.368,3.025-3.267,0.04L1.493,13.895z')
        //     .attr('fill', '#303841')
        //     .attr('transform', 'translate(30,60)');

        //   var circles = svg.append('circle')
        //     .attr('cx', '40')
        //     .attr('cy', '40')
        //     .attr('r', '33')
        //     .style('fill', '#303841');
        //   var circles = svg.append('circle')
        //     .attr('cx', '40')
        //     .attr('cy', '40')
        //     .attr('r', '30')
        //     .style('fill', color);
        //   var text = svg.append('text')
        //     .attr('dx', 27)
        //     .attr('dy', 32)
        //     .attr('text-anchor', 'middle')
        //     .attr('style', 'font-size:' + fontSize + 'px; fill: #FFFFFF; font-family: Arial, Verdana; font-weight: bold')
        //     .text(number);

        //   var svgNode = svg.node().parentNode.cloneNode(true),
        //     image = new Image();

        //   d3.select(svgNode).select('clippath').remove();

        //   var xmlSource = (new XMLSerializer()).serializeToString(svgNode);

        //   image.onload = (function(imageWidth, imageHeight) {
        //     var canvas = document.createElement('canvas'),
        //       context = canvas.getContext('2d'),
        //       dataURL;

        //     d3.select(canvas)
        //       .attr('width', imageWidth)
        //       .attr('height', imageHeight);

        //     context.drawImage(image, 0, 0, imageWidth, imageHeight);

        //     dataURL = canvas.toDataURL();
        //   }).bind(this, imageWidth, imageHeight);

        //   image.src = 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(xmlSource).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        //     return String.fromCharCode('0x' + p1);
        //   }));
        // };


        this.selectedAQI = 0;
        this.dataResourcesCount = 0;

        this.allPublicData = [];
        this.tempPublicData = [];
        this.allUberData = [];
        this.tempUberData = [];

        //fetch all public data from server
        AllPublicDataItems.query().$promise.then(function(data){
            self.dataResourcesCount = data[0].length;
            self.allPublicData = data[0];
            self.allUberData = data[1];
            angular.forEach(data[0],function(item){
                self.tempPublicData.push(item);
                item.imagePath = AQIColorService.getPinPath(item.aqi);
                self.addNewMarker(item.deviceId, item.latitude, item.longitude, item.label, item.loc, item.imagePath, item.type);
            });
            angular.forEach(data[1],function(item){
                self.tempUberData.push(item);
                item.imagePath = "assets/images/pins/uber.svg";
                //self.addNewMarker(item.deviceId, item.stop_lat, item.stop_lon, "Uber", "Roaming Around", item.imagePath, item.deviceType);
            });
            self.dataResourcesCount = self.tempPublicData.length;

            angular.forEach(data, function(item){
                
            });

            self.changeContributor(null);
        });

        // AllAQIDataItems.query().$promise.then(function(data){
        //     angular.forEach(self.allPublicData, function(item){
        //         angular.forEach(data, function(dataItem){
        //             if(item.deviceId == dataItem.deviceId){
        //                 item.aqi = dataItem.aqi;
        //                 item.imagePath = AQIColorService.getPinPath(item.aqi);
        //                 self.addNewMarker(item.deviceId, item.latitude, item.longitude, item.label, item.loc, item.imagePath, item.type);
        //             }
        //         });
        //     });
        //     angular.forEach(self.allUberData, function(item){
        //         item.aqi = 0;
        //         item.imagePath = "assets/images/pins/uber.svg";
        //         self.addNewMarker(item.deviceId, item.stop_lat, item.stop_lon, "Uber", "Roaming Around", item.imagePath, item.deviceType);
                
        //     });
            
        // });

        var w = angular.element($window);
        $scope.viewPortHeight = w.height() - 90;

        this.windowWidth = w.width();
        this.graphWidth = (this.windowWidth/4) - 40;

        //calling fields api to make basic calls and storing to cookies
        FieldsDataItems.query().$promise.then(function(data) {
            self.fieldItems = data;
            FieldsService.storeFieldsData(self.fieldItems);
            self.fieldsData = FieldsService.getFieldsData();
        });

        this.markersToshow = [];
        $scope.onClicked = function(marker){
        };
        //click called 
        this.markerClicked = function(marker, deviceId, deviceLabel, deviceAddr, contributor){
            deviceId = deviceId.replace(/ /g,'');
            self.selectedDeviceId = deviceId;
            self.initializeGraphColors();
            //marker.options.icon = 
            self.getSelectedDeviceData(deviceId);
            self.selectedModalType = 'daily';
            self.analyticsClicked = false;
            self.selectedMarker = marker;
            self.updateSelectedData(deviceLabel, deviceAddr);
        };

        this.lastUpdatedTime = null;
        this.selectedDeviceLabel = "A Global Air-Pollution Initiave";
        this.selectedDeviceAddr = null;
        this.deviceDataFetched = false;
        this.selectedDeviceData = {};
        this.selectedModalType = 'home';
        this.analyticsClicked = false;

        this.changeModalType = function(type){
            if(self.selectedDeviceId !== 0){
                if(type == 'analytics'){
                    self.selectedDeviceLabel = self.selectedMarker.title;
                    self.selectedDeviceAddr = self.selectedMarker.address;
                    if(self.selectedDeviceId !== 0){
                        if(self.analyticsClicked){
                        } else {
                            self.getDailyAnalyticsData(self.selectedDeviceId);
                        }
                    }
                } else if (type == 'daily'){
                    self.selectedDeviceLabel = self.selectedMarker.title;
                    self.selectedDeviceAddr = self.selectedMarker.address;
                    if(self.selectedDeviceId === 0){
                        self.initializeGraphData();
                    }
                    
                } else if (type == 'home') {
                    self.selectedDeviceLabel = "A Global Air-Pollution Initiave";
                    self.selectedDeviceAddr = null;
                } else {}
                self.selectedModalType = type;
            }
        };

        this.closeModalWindow = function(){
            self.deviceDataFetched = null;
        };

        this.updateSelectedData = function(deviceLabel, address){
            self.selectedDeviceLabel = deviceLabel;
            self.selectedDeviceAddr = address;
        };

        this.activityArray = null;

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
            if(self.graphWidth > 0){
                self.aqiGraph.options.chart.width = self.graphWidth;
            }
            self.currentAverageAQI = Math.floor(self.currentAverageAQI);
            self.aqiGraph.options.title.text = "Average AQI : "+self.currentAverageAQI;
        };
    }
})();
