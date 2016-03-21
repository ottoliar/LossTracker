// entryController.js -- Display today's entries 
(function () {

    'use strict';

    angular.module("appDiary")
        .controller("entryController", entryController);

    function entryController($scope, $http, $filter, diaryTracker) {

        // Create the ViewModel
        var vm = this;

        vm.today = $filter("date")(new Date(), "EEEE, MM/dd/yyyy");

        function _getAllEntries() {
            vm.loadIsBusy = true;
            diaryTracker.getEntriesForToday()
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        })
        };

        var _onComplete = function () {
            vm.breakfast = diaryTracker.getBreakfastEntries();
            vm.lunch = diaryTracker.getLunchEntries();
            vm.dinner = diaryTracker.getDinnerEntries();
            vm.snacks = diaryTracker.getSnackEntries();
        };

        var _onError = function () {
            vm.error = "Error retrieving entries from database";
        };

        // Get latest diary entries for this particular day on page load
        _getAllEntries();

    }

})();