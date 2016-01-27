// searchController.js -- Search food database
(function () {

    "use strict";

    angular.module('instantSearch', [])
            .controller('instantSearchCtrl', function ($scope, $http) {

                var url = ("/api/foods/");

                $scope.$watch('search', function () {
                    fetch();
                });

                function fetch() {
                    if ($scope.details === undefined) {
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