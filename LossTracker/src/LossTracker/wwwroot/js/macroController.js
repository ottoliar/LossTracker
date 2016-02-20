// macroController.js -- Get/Update user macros
(function () {

    'use strict';

    angular.module('appDiary')
            .controller('MacroController', function ($scope, $http, diaryTracker) {

                // Get latest totals from the database
                diaryTracker.syncWithDatabase(updateToLatestDiary);
                var url = '/api/profile/';

                function fetchProfile() {
                    $http.get(url).then(function(response) {
                        $scope.profileMacros = response.data;
                    });
                }

                function updateToLatestDiary() {
                    $scope.consumed = diaryTracker.getLatestDiaryMacros();
                }

                $scope.labels = ["Carbohydrates", "Protein", "Fats"];
                $scope.data = [50, 80, 75];
                $scope.colours = ["#FF851B", "#001f3f", "#FF4136"]

                fetchProfile();
            });

})();
