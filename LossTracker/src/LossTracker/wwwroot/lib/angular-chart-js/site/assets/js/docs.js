angular.module('sysen', ['ngMaterial', 'ngRoute', 'sysChart'])

    .config(['$locationProvider', function ($location) {
        $location.html5Mode(true);
    }])

    .config(['$routeProvider', function ($route) {
        $route.otherwise({ redirectTo: '/' });
    }])

    .config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue', {
                default: '500',
                'hue-1': '100',
                'hue-2': '300',
                'hue-3': '700'
            })
            .accentPalette('cyan', {
                default: '700',
                'hue-1': '300',
                'hue-2': '500',
                'hue-3': '900'
            })
            .warnPalette('red', {
                default: '700',
                'hue-1': '500',
                'hue-2': '600',
                'hue-3': '800'
            });
    }])

    .controller('LineCtrl', function () {
        this.data = {
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    data: [40, 10, 60, 70, 20, 20]
                },
                {
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    data: [30, 70, 40, 90, 60, 70]
                }
            ]
        };

        this.options = {
            scaleShowGridLines: false,
            pointDot: false,
            bezierCurve: false
        };
    })

    .controller('BarCtrl', function () {
        this.data = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.4)",
                    strokeColor: "rgba(220,220,220,1)",
                    data: [65, 59, 80, 81, 56, 55, 40]
                },
                {
                    fillColor: "rgba(151,187,205,0.4)",
                    strokeColor: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 86, 27, 90]
                }
            ]
        };

        this.options = {
            scaleShowGridLines: false,
            barShowStroke: false,
            barDatasetSpacing: 0
        };
    })

    .controller('RadarCtrl', function () {
        this.data = {
            labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
            datasets: [
                {
                    fillColor: "rgba(220,220,220,0.2)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    data: [65, 59, 90, 81, 56, 55, 40]
                },
                {
                    fillColor: "rgba(151,187,205,0.2)",
                    strokeColor: "rgba(151,187,205,1)",
                    pointColor: "rgba(151,187,205,1)",
                    data: [28, 48, 40, 19, 96, 27, 100]
                }
            ]
        };

        this.options = {
            pointDot: false,
            datasetStroke: false,
            pointLabelFontSize: 12
        };
    })

    .controller('PolarCtrl', function () {
        this.data = [
            {
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            },
            {
                value: 40,
                color: "#949FB1",
                highlight: "#A8B3C5",
                label: "Grey"
            },
            {
                value: 120,
                color: "#4D5360",
                highlight: "#616774",
                label: "Dark Grey"
            }

        ];

        this.options = {
            segmentShowStroke: false,
            animationSteps: 20,
            animationEasing: "linear",
            animateScale: true
        };
    })

    .controller('PieCtrl', function () {
        this.data = [
            {
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        this.options = {
            segmentShowStroke: false,
            animationSteps: 40,
            animationEasing: "linear"
        };
    })

    .controller('DoughnutCtrl', function () {
        this.data = [
            {
                value: 300,
                color: "#F7464A",
                highlight: "#FF5A5E",
                label: "Red"
            },
            {
                value: 50,
                color: "#46BFBD",
                highlight: "#5AD3D1",
                label: "Green"
            },
            {
                value: 100,
                color: "#FDB45C",
                highlight: "#FFC870",
                label: "Yellow"
            }
        ];

        this.options = {
            segmentShowStroke: false,
            animationSteps: 40,
            animationEasing: "linear"
        };
    })

    .controller('MenuCtrl', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        this.goto = function (target) {
            $location.hash(target);
            $anchorScroll();
            $location.hash('');
        }
    }])

    .controller('DemoCtrl', function () {
        this.showSource = false;
    });
