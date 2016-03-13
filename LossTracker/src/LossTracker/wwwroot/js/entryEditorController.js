// entryEditorController.js -- Edit an entry
(function () {

    'use strict';

    angular.module("appDiary")
            .controller("entryEditorController", entryEditorController);

    // Entry ID to be edited is passed in as a route parameter
    function entryEditorController($routeParams, $location, diaryTracker) {

        // Creating the ViewModel for this page
        var vm = this;

        var entryId = $routeParams.entryId;
        
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
            // No change was made
            if (vm.newNumberOfServings === entry.numberOfServings) {
                // Redirect to root 
                $location.path("/");
            } else {
                // Post edited entry and then redirect back to main page
                var oldNumServings = entry.numberOfServings;
                var newNumServings = vm.newNumberOfServings;
                diaryTracker.editEntry(entry, oldNumServings, newNumServings)
                            .finally(function () {
                                $location.path("/");
                            });
            }
        };

        // Delete the entry
        vm.deleteEntry = function (entry) {
            diaryTracker.deleteEntry(entry);
        };

        _getEntry();
        
    }


})();