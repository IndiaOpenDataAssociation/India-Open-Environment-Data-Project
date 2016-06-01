(function() {
    'use strict';

    angular.module('dashboard')
        .factory('RealtimeGraphFactory', RealtimeGraphFactory);

    function RealtimeGraphFactory($rootScope) {
        return {
            getAreaGraph: function() {
                return {
                    "options": {
                        "chart": {
                            "type": "areaspline",
                            zoomType: 'x',
                            height: 200,
                            width: 320,
                            backgroundColor:'rgba(255, 255, 255, 0.01)',
                            exporting: { enabled: false }
                        },
                        exporting: { enabled: false },
                        title: {
                            enabled: true,
                            text: '',
                            style: {
                                'color' : '#fff',
                                'font-size' : '14px'
                            }
                        },
                        xAxis: {
                            type: 'datetime',
                            style: {
                                'color' : '#fff'
                            },
                            title : {
                                style : {
                                    'color' : "#fff"
                                }
                            }
                        },
                        global: {
                            useUTC: false
                        },
                        yAxis: {
                            title: {
                                text: null
                            },
                            labels: {
                                style: {
                                    'color' : '#fff'
                                }
                            }
                        },
                        "plotOptions": {
                            "series": {
                                "stacking": ""
                            }
                        },
                        rangeSelector : {
                            selected : 1
                        },
                    },
                    "global": {
                        useUTC: false
                    },
                    "series": [{
                        "name": "Data",
                        showInLegend: false,
                        "data": [],
                        "dataGrouping" : {
                            "units" : [
                                ['week', // unit name
                                [1] // allowed multiples
                            ], [
                                'month', 
                                [1, 2, 3, 4, 6]]
                            ]
                        },
                        "color": "#00b3bf",
                        "fillColor": "rgba(255,255,255,0.1)",
                        "id": "Visits"
                    }],
                    "credits": {
                        "enabled": false
                    },
                    "loading": false,
                    "size": {},
                    chart: {
                        zoomType: 'x'   
                    },
                };
            },
            getDonuteGraph: function() {
                return {
                    chart: {
                        type: 'pie'
                    },
                    yAxis: {
                        title: {
                            enabled: false
                        }
                    },
                    options: {
                        chart: {
                            height: 300
                        },
                        title: {
                            text: "",
                            align: 'center',
                            verticalAlign: 'middle',
                            y: -10
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: false,
                                    distance: -15,
                                    style: {
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '0px 1px 2px black'
                                    }
                                },
                                showInLegend: true
                            },
                        },
                        "credits": {
                            "enabled": false
                        },
                    },
                    tooltip: {
                        valueSuffix: '%'
                    },
                    series: [{
                        type: 'pie',
                        name: "Percentage",
                        color: "#caac95",
                        innerSize: '70%',
                        data: [{
                            name: 'Non-Interaction',
                            y: 0,
                            color: "#caac95",
                        }, {
                            name: "Interaction",
                            y: 0,
                            color: "#3d3d3d"
                        }]
                    }]
                };
            },
            getVisitBarGraph: function() {
                return {
                    "options": {
                        "chart": {
                            "type": "bar",
                            height: 150
                        },
                        "plotOptions": {
                            "series": {
                                "stacking": "normal"
                            }
                        },
                        xAxis: {
                            categories: ['Visitors'],
                            labels: {
                                enabled: false
                            }
                        },
                        yAxis: {
                            min: 0,
                            labels: {
                                enabled: false
                            },
                            title: {
                                enabled: false
                            },
                            gridLineColor: "#fff"
                        },
                    },
                    "series": [{
                        "name": 'New',
                        "data": [],
                        "color": '#978270'
                    }, {
                        "name": "Returning",
                        "data": [],
                        "color": '#CAAC95'
                    }],
                    "title": {
                        "text": "Visitors",
                        align: "left"
                    }
                };
            },
            getInteractionBarGraph: function() {
                return {
                    "options": {
                        "chart": {
                            "type": "bar",
                            height: 150
                        },
                        "plotOptions": {
                            "series": {
                                "stacking": "normal"
                            }
                        },
                        xAxis: {
                            categories: ['Interaction'],
                            labels: {
                                enabled: false
                            }
                        },
                        yAxis: {
                            min: 0,
                            labels: {
                                enabled: false
                            },
                            title: {
                                enabled: false
                            },
                            gridLineColor: "#fff"
                        },
                    },
                    "series": [{
                        "name": 'New',
                        "data": [],
                        "color": "1a1a1a"
                    }, {
                        "name": "Returning",
                        "data": [],
                        "color": "3d3d3d"
                    }],
                    "title": {
                        text: "Interactions",
                        align: 'left'
                    }
                };
            },
            getGenderGraph: function() {
                return {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: 0,
                        plotShadow: false,
                    },
                    title: {
                        text: 'Gender',
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 40
                    },
                    tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                    },
                    options: {
                        chart: {
                            height: 290
                        },
                        plotOptions: {
                            pie: {
                                dataLabels: {
                                    enabled: false,
                                    distance: -20,
                                    style: {
                                        fontWeight: 'bold',
                                        color: 'white',
                                        textShadow: '0px 1px 2px black'
                                    }
                                },
                                showInLegend: true,
                                startAngle: -90,
                                endAngle: 90,
                                center: ['50%', '75%']
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: 'Gender',
                        innerSize: '70%',
                        data: [{
                            name: 'Female',
                            y: 50,
                            color: "3d3d3d"
                        }, {
                            name: 'Male',
                            y: 50,
                            color: "#CAAC95"
                        }]
                    }]
                };
            },

            getAgeColumnGraph: function() {
                return {
                    options: {
                        chart: {
                            type: 'column',
                            height: 600
                        },
                        title: {
                            enabled: false,
                            text: ''
                        }
                    },
                    xAxis: {
                        categories: [],
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            enabled: false
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: 'Female',
                        data: [],
                        color: "3d3d3d"
                    }, {
                        name: 'Male',
                        data: [],
                        color: '#CAAC95'
                    }]
                };
            },

            getHeatMap: function() {
                return {
                    options: {
                        chart: {
                            type: 'heatmap'
                        },
                        colorAxis: {
                            min: 0,
                            minColor: '#ffe6c8',
                            maxColor: "3d3d3d"
                        },
                        tooltip: {
                            formatter: function() {
                                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> has <br><b>' +
                                    this.point.value + '</b> footfall on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                            }
                        },

                        credits: {
                            enabled: false
                        }
                    },

                    xAxis: {
                        title: {
                            enabled: true,
                            text: 'Regions'
                        },
                        categories: null
                    },

                    yAxis: {
                        title: {
                            enabled: true,
                            text: 'Time'
                        },
                        categories: null,
                    },
                    title: {
                        text: '',
                        enabled: false
                    },
                    series: [{
                        name: 'Footfall on regions',
                        turboThreshold: 100000,
                        dataLabels: {
                            enabled: true,
                            color: '#fff'
                        },
                        states: {
                            hover: {
                                enabled: false
                            }
                        },
                        data: null
                    }]
                };
            },

            /** factory over **/
        };
    }
})();
