// entryEditorController.js -- Edit an entry
(function () {

    'use strict';

    angular.module("appDiary")
            .controller("entryEditorController", entryEditorController);

    // Entry ID to be edited is passed in as a route parameter
    function entryEditorController($routeParams, $location, $alert, diaryTracker) {

        // Creating the ViewModel for this page
        var vm = this;

        // Get entry parameter for URL (entry to be edited)
        var entryId = $routeParams.entryId;

        // Disable the submit button upon initial click
        vm.isDisabled = false;

        // Alerts for successful edit/delete
        vm.alertEditSuccess = $alert({
            title: "Add Successful!",
            content: "Entry added to database.",
            placement: 'top',
            type: 'success',
            duration: 3,
            show: false
        });
        
        // Get the entry to be edited
        function _getEntry() {
            vm.loadIsBusy = true;
            diaryTracker.getSingleEntry(entryId)
                        .then(_onComplete, _onError)
                        .finally(function () {
                            vm.loadIsBusy = false;
                        });
        } 

        var _onComplete = function (data) {
            vm.currentEntry = data;
            // Set new no. of servings to be equal initally to passed in value
            vm.newNumberOfServings = vm.currentEntry.numberOfServings;
        };

        var _onError = function () {
            vm.error = "Error retrieving entry from database";
        }

        // Post modified entry to the database
        vm.postEdit = function (entry) {
            vm.isDisabled = true;
            // No change was made, redirect to index
            if (vm.newNumberOfServings === entry.numberOfServings) {
                $location.path("/");
            // Post edited entry and then redirect back to main page
            } else {
                var oldNumServings = entry.numberOfServings;
                var newNumServings = vm.newNumberOfServings;
                diaryTracker.editEntry(entry, oldNumServings, newNumServings)
                            .finally(function () {
                                vm.alertEditSuccess.show();
                                $location.path("/");
                            });
            }
        };

        // Delete entry from the database
        vm.deleteEntry = function (entry) {
            diaryTracker.deleteEntry(entry);
        };

        _getEntry();
        
    }


})();