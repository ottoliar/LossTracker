// entryController.js -- Display ALL measurement entries of current user
(function () {

    'use strict';

    angular.module("appProgress")
            .controller("entryWeightController", entryWeightController);

    function entryWeightController($rootScope, $alert, $filter, weightTracker) {

        // ViewModel
        var vm = this;

        // Setting the new measurement form to have values corresponding to last entry
        vm.newMeasurement = {
            weightLbs: null,
            waistInches: null
        };

        // Post new entries to the database
        vm.addEntry = function () {
            if (vm.newMeasurement.weightLbs == null || vm.newMeasurement.waistInches == null)
                return;

            weightTracker.addMeasurement(vm.newMeasurement.weightLbs, vm.newMeasurement.waistInches);
        };

        // Delete entries from the database
        vm.deleteEntry = function (id) {
            weightTracker.deleteMeasurement(id);
        };

        // Pull user's measurements from the database to display to user
        function _getAllMeasurements() {
            vm.loadIsBusy = true;
            weightTracker.fetchMeasurements()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        });
        }

        // Configure charts to be displayed to the user
        // Graph will display entry dates on the x-axis with corresponding weights/waist on y-axis
        function _configCharts() {
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

            // Get the last 5 measurements and set up the graph arrays correspondingly
            for (var i = 0; i < vm.measurements.length; i++) {
                _extractData(vm.measurements[i]);
            }
        }

        // Utility function to extract data from measurement objects in order to build graph
        function _extractData(measurement) {
            var dateLabel = $filter('date')(measurement.created, 'shortDate');
            vm.weightChartLabels.push(dateLabel);
            vm.waistChartLabels.push(dateLabel);
            vm.weightData[0].push(measurement.weightLbs);
            vm.waistData[0].push(measurement.waistInches);
        }

        // Utility function to remove entries from chart once they are deleted
        function _removeFromChart(id) {

        }

        // Get latest measurements (if any) from service and initialize graph with those values
        function _onComplete() {
            vm.measurements = weightTracker.getMeasurements();
            var measurementsLength = vm.measurements.length;

            if (measurementsLength === 0) {
                vm.noEntries = true;
                return;
            } else {
                vm.noEntries = false;
            }
            
            // Set values for adding a new measurement
            vm.newMeasurement.weightLbs = vm.measurements[measurementsLength - 1].weightLbs;
            vm.newMeasurement.waistInches = vm.measurements[measurementsLength - 1].waistInches;

            _configCharts();
        }

        function _onError() {
            vm.error = "Error retrieving measurements from database";
        }

        // Watch the service to see when new entries are added/deleted
        // Update the chart accordingly with last added entry
        $rootScope.$on('measurementAdded', function () {
            if (vm.measurements.length === 1) {
                _getAllMeasurements();
            } else {
                var index = vm.measurements.length - 1;
                _extractData(vm.measurements[index]);
            }
        });

        $rootScope.$on('measurementDeleted', function (event, args) {
            if (vm.measurements.length === 0) {
                vm.noEntries = true;
            } else {
                _removeFromChart(args);
            }
        });

        // Get initial measurements upon page load
        _getAllMeasurements();
    }

})();