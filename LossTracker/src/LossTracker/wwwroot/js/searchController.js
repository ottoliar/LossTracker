// searchController.js -- Search food database
(function () {

    'use strict';

    angular.module('appDiary')
        .controller('InstantSearchCtrl', function ($scope, $http, diaryTracker) {

            var url = '/api/foods/';

            $scope.$watch('search', function () {
                fetchFoods();
            });

            $scope.addFood = function (id, numServings) {
                diaryTracker.addFood(id, numServings)
                            .then(onAdd, onError);
            };

            function onAdd(data) {
                $scope.status = data['food']['description'] + "added successfully.";
            }

            function onError(response) {
               $scope.error = "Error adding food. Please try again";
            }

            // Live feed results of database objects matching user query
            function fetchFoods () {
                if ($scope.details === undefined || $scope.search.length !== 0) {
                    var queryUrl = url + $scope.search;
                    $http.get(queryUrl).then(function (response) {
                        $scope.details = response.data;
                    });
                } else {
                    $scope.details = undefined;
                }
            }

            // Utility function to select all entered characters in text box
            $scope.select = function () {
                this.setSelectionRange(0, this.value.length);
            }

     });

})();