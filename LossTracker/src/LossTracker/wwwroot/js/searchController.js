// searchController.js -- Search food database
(function () {

    'use strict';

    angular.module('appDiary')
        .controller('InstantSearchCtrl', ["$scope", "$http", function($scope, $http) {

            var url = '/api/foods/';

            $scope.$watch('search', function() {
                fetchFoods();
            });

            function fetchFoods() {
                if ($scope.details === undefined || $scope.search.length !== 0) {
                    var queryUrl = url + $scope.search;
                    $http.get(queryUrl).then(function(response) {
                        $scope.details = response.data;
                    });
                } else {
                    $scope.details = undefined;
                }
            }

            $scope.addFood = function(id) {
                //console.log(id);
            };

            $scope.select = function() {
                this.setSelectionRange(0, this.value.length);
            }

     }]);

})();