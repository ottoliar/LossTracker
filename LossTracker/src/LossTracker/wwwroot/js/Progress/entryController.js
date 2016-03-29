// entryController.js -- Display ALL measurement entries of current user
(function () {

    'use strict';

    angular.module("appProgress")
            .controller("entryController", entryController);

    function entryController($alert, weightTracker) {

        // ViewModel
        var vm = this;

        function _getAllMeasurements() {
            vm.loadIsBusy = true;
            weightTracker.fetchMeasurements()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        });
        }

        function _onComplete() {
            vm.measurements = weightTracker.getMeasurements();
        }

        function _onError() {
            vm.error = "Error retrieving measurements from database";
        }

        _getAllMeasurements();
    }

})();