// entryController.js -- Display ALL measurement entries of current user
(function () {

    'use strict';

    angular.module("appProgress")
            .controller("entryWeightController", entryWeightController);

    function entryWeightController($rootScope, $alert, $filter, weightTracker) {

        // ViewModel
        var vm = this;
        vm.noEntries = true;

        // Pull user's measurements from the database to display to user
        function _getAllMeasurements() {
            vm.loadIsBusy = true;
            weightTracker.fetchMeasurements()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        });
        }

        // Get latest measurements from service and initialize graph with those values
        // Graph will display last 5 (max) entry dates on the x-axis with corresponding weights on y-axis
        function _onComplete() {
            vm.measurements = weightTracker.getMeasurements();

            if (vm.measurements.length === 0)
                return;

            // Configuring the charts
            vm.noEntries = false;
            vm.weightChartLabels = [];
            vm.waistChartLabels = [];
            vm.weightData = [[]];
            vm.waistData = [[]];
            vm.weightColours = ["#FF851B", "#FFFFFF", "#FFFFFF"];
            vm.waistColours = ["#4b6cb7", "#4b6cb7", "#4b6cb7"];
            vm.weightOptions = {
                tooltipTemplate: "<%=label%>: <%=value%> lbs",
                scaleShowGridLines: true,
                scaleGridLineColor: "#FFFFFF",
                scaleGridLineWidth: 0.1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true
            };
            vm.waistOptions = {
                tooltipTemplate: "<%=label%>: <%=value%> inches",
                scaleShowGridLines: true,
                scaleGridLineColor: "#FFFFFF",
                scaleGridLineWidth: 0.1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true
            };

            for (var i = 0; vm.measurements[i] != undefined && i < 5; i++) {
                var dateLabel = $filter('date')(vm.measurements[i].created, 'shortDate');
                vm.weightChartLabels.push(dateLabel);
                vm.waistChartLabels.push(dateLabel);
                vm.weightData[0].push(vm.measurements[i].weightLbs);
                vm.waistData[0].push(vm.measurements[i].waistInches);
            }

            // Filling out any empty chart data points for a more consistent visual
            for (var i = 0; vm.weightChartLabels.length < 5; i++) {
                vm.weightChartLabels[i + 1] = vm.weightChartLabels[0];
                vm.waistChartLabels[i + 1] = vm.waistChartLabels[0];
                vm.weightData[0].push(vm.measurements[0].weightLbs);
                vm.waistData[0].push(vm.measurements[0].waistInches);
            }
        }

        function _onError() {
            vm.error = "Error retrieving measurements from database";
        }

        // Subscribe to changes in the array containing most in sync with database
        weightTracker.subscribe(vm, function measurementsModified() {
            _onComplete();
        });

        // Get initial measurements upon page load
        _getAllMeasurements();
    }

})();