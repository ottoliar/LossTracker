// weight.js -- Directive returning view for progress weight data
(function () {

    'use strict';

    // Return weight html when <div weight></div> tags used
    angular.module('weight', [])
            .directive('weight', weight);

    function weight() {

        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/views/Progress/progressIndexWeight.html'
        };
    }

})();