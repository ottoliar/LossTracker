// macroController.js -- Get/Update user macros
(function () {

    'use strict';

    angular.module('appDiary')
            .controller('MacroController', ["$scope", "$http", function($scope, $http) {

                var url = '/api/profile/';

                function fetchProfile() {
                    $http.get(url).then(function(response) {
                        $scope.profileMacros = response.data;
                    });
                }

                $scope.consumed = {
                    calories: 0,
                    carbs: 0,
                    protein: 0,
                    fat: 0
                };

                fetchProfile();
            }]);

})();
