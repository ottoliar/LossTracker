// weightTrackerService.js -- Makes calls to API to update/get latest 
// user measurements in order to track progress accurately 
(function () {

    'use strict';

    var weightTracker = function ($http) {

        var measurementApi = "/api/measurements/";

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

        return {
            fetchMeasurements: fetchMeasurements,
            getMeasurements: getMeasurements
        };
    };

    var module = angular.module("appProgress");

    // Register the service
    module.factory("weightTracker", weightTracker);

})();