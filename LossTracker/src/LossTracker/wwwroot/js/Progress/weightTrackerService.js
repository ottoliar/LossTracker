// weightTrackerService.js -- Makes calls to API to update/get latest 
// user measurements in order to track progress accurately 
(function () {

    'use strict';

    var weightTracker = function ($http, $rootScope) {

        var measurementApi = "/api/measurements/";

        // Hold measurements pulled from the database
        var measurements = [];

        // Make an API call to get all of the user's measurements
        function fetchMeasurements() {
            return $http.get(measurementApi)
                        .then(function (response) {
                            angular.copy(response.data, measurements);
                        });
        }

        // Return the array filled with the user's measurements
        function getMeasurements() {
            return measurements;
        }

        // Post the new measurement to the database via API and update the array
        function addMeasurement() {

            $rootScope.$emit('measurementArrayModified');
        }

        return {
            fetchMeasurements: fetchMeasurements,
            getMeasurements: getMeasurements,
            addMeasurement: addMeasurement,
            subscribe: function (scope, callback) {
                var handler = $rootScope.$on('measurementArrayModified', callback);
                //scope.$on('$destroy', handler);
            }
        };
    };

    var module = angular.module("appProgress");

    // Register the service
    module.factory("weightTracker", weightTracker);

})();