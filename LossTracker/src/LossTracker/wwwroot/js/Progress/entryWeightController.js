// entryController.js -- Display ALL measurement entries of current user
(function () {

    'use strict';

    angular.module("appProgress")
            .controller("entryWeightController", entryWeightController);

    function entryWeightController($rootScope, $filter, weightTracker) {

        // ViewModel
        var vm = this;

        // Array holding the id's of measurements currently displayed on the graph
        // Used to successfully remove an entry from the graphs once deleted from the service
        var measurementIds = [];

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

        // Watch the service to see when new entries are added/deleted
        // Update the chart accordingly with last added entry
        $rootScope.$on('measurementAdded', function (event, args) {
            if (vm.measurements.length === 1) {
                _configCharts();
            } else {
                var index = vm.measurements.length - 1;
                _extractData(vm.measurements[index]);
            }
            measurementIds.push(args.id);
        });

        // args here is the id of the measurement deleted from the service
        $rootScope.$on('measurementDeleted', function (event, args) {
            _removeFromChart(args);
        });

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

            // Extract the relevant data from the measurement entries in order to init graphs
            for (var i = 0; i < vm.measurements.length; i++) {
                var currentMeasurment = vm.measurements[i];
                _extractData(currentMeasurment);
                measurementIds.push(currentMeasurment.id);
            }
        }

        // Utility function to extract data from measurement objects in order to build graphs
        function _extractData(measurement) {
            var dateLabel = $filter('date')(measurement.created, 'shortDate');
            vm.weightChartLabels.push(dateLabel);
            vm.waistChartLabels.push(dateLabel);
            vm.weightData[0].push(measurement.weightLbs);
            vm.waistData[0].push(measurement.waistInches);
        }

        // Utility function to remove entries from chart once they are deleted
        function _removeFromChart(id) {
            for (var i = 0; i < measurementIds.length; i++) {
                if (id === measurementIds[i]) {
                    measurementIds.splice(i, 1);
                    vm.waistChartLabels.splice(i, 1);
                    vm.weightChartLabels.splice(i, 1);
                    vm.weightData[0].splice(i, 1);
                    vm.waistData[0].splice(i, 1);
                    if (measurementIds.length === 0)
                        vm.noEntries = true;
                }
            }
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
            // Set the form values for adding a new measurement to be latest entry
            vm.newMeasurement.weightLbs = vm.measurements[measurementsLength - 1].weightLbs;
            vm.newMeasurement.waistInches = vm.measurements[measurementsLength - 1].waistInches;
            _configCharts();
        }

        function _onError() {
            vm.error = "Error retrieving measurements from database";
        }

        // Pull user's measurements from the database to display to user
        function _getMeasurements() {
            vm.loadIsBusy = true;
            weightTracker.fetchMeasurements()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        });
        }

        // Get initial measurements upon page load
        _getMeasurements();
    }

})();