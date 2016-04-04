// weightTrackerService.js -- Makes calls to API to update/get latest 
// user measurements in order to track progress accurately 
(function () {

    'use strict';

    var weightTracker = function ($http, $rootScope) {

        var measurementApiUrl = "/api/measurements/";
        var deletionApiUrl = "/api/delete/measurements/";

        // Hold measurements pulled from the database
        var measurements = [];

        // Make an API call to get all of the user's measurements
        function fetchMeasurements() {
            return $http.get(measurementApiUrl)
                        .then(function (response) {
                            angular.copy(response.data, measurements);
                        });
        }

        // Return the array filled with the user's measurements
        function getMeasurements() {
            return measurements;
        }

        // Post the new measurement to the database via API and update the array
        function addMeasurement(weight, waist) {
            var newMeasurement = {
                weightLbs: weight,
                waistInches: waist
            };
            $http.post(measurementApiUrl, JSON.stringify(newMeasurement))
                    .then(function (response) {
                        measurements.push(response.data);
                        $rootScope.$broadcast('measurementAdded', response.data);
                    });
        }

        // Delete the new measurement from the database and update the chart
        function deleteMeasurement(id) {
            var completeDeletionUrl = deletionApiUrl + id;
            return $http.post(completeDeletionUrl)
                        .then(function () {
                            for (var i = 0; i < measurements.length; i++) {
                                var current = measurements[i];
                                if (current.id === id) {
                                    measurements.splice(i, 1);
                                }
                            }
                            $rootScope.$broadcast('measurementDeleted', id);
                        });
        }

        return {
            fetchMeasurements: fetchMeasurements,
            getMeasurements: getMeasurements,
            addMeasurement: addMeasurement,
            deleteMeasurement: deleteMeasurement
        };
    };

    var module = angular.module("appProgress");

    // Register the service
    module.factory("weightTracker", weightTracker);

})();