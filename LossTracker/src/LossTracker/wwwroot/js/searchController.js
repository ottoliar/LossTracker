// searchController.js -- Search food database
(function () {

    'use strict';

    angular.module('instantSearch', ['ngAnimate', 'mgcrea.ngStrap'])
            .controller('instantSearchCtrl', function ($scope, $http) {

                var url = '/api/foods/';

                $scope.$watch('search', function () {
                    fetch();
                });

                function fetch() {
                    if ($scope.details === undefined || $scope.search.length !== 0) {
                        var queryUrl = url + $scope.search;
                        $http.get(queryUrl).then(function (response) {
                            $scope.details = response.data;
                        });
                    } else {
                        $scope.details = undefined;
                    }
                }

                $scope.select = function () {
                    this.setSelectionRange(0, this.value.length);
                }
            });

})();