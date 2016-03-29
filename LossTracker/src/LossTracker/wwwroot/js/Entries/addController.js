// addController.js -- Add Entries to the database
(function () {

    'use strict';

    angular.module("appDiary")
        .controller("addController", addController);

    function addController($routeParams, $location, $scope, $http, $alert, diaryTracker) {

        var vm = this;

        // Alert for add to today's diary
        vm.alertAddSuccess = $alert({
            title: "Add Successful!",
            content: "One serving was added to your diary",
            placement: "top-right",
            type: "success",
            duration: 3,
            dismissable: true,
            show: false
        });

        // Used to reach API endpoint
        var url = "/api/foods/";

        // Determine which meal to add the new entry to
        vm.mealId = $routeParams.mealId;

        // Used when user searches the DB for food that is not there
        vm.noResultFound = false;

        // Search database for foods
        $scope.$watch("search", function (newValue, oldValue) {
            if (newValue == oldValue) return;
            _fetchFoods();
        });

        // Use diary tracker service to add a new entry on current date
        vm.addDiaryEntry = function (foodId) {
            // Add only one serving for now
            diaryTracker.addDiaryEntry(foodId, 1, vm.mealId)
                        .finally(function () {
                            vm.alertAddSuccess.show();
                            $location.path("/");
                        });
        };

        // Live feed results of database objects matching user query in search bar
        function _fetchFoods() {
            if (vm.searchResults === undefined || $scope.search.length !== 0) {
                vm.searchIsBusy = true;
                var queryUrl = url + $scope.search;

                $http.get(queryUrl)
                    .then(function (response) {
                        if (response.data.length == 0) {
                            vm.noResultFound = true;
                        } else {
                            vm.noResultFound = false;
                        }
                        vm.searchResults = response.data;
                    }).finally(function () {
                        vm.searchIsBusy = false;
                    });
            } else {
                vm.noResultFound = false;
                vm.searchResults = undefined;
            }

            // Utility function to select all entered characters in text box
            vm.select = function () {
                this.setSelectionRange(0, this.value.length);
            };
        }

    }

})();