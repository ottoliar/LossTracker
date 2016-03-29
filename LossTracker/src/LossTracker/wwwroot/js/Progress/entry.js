// entry.js -- Directive returning view for progress entries
(function () {

    'use strict';

    // Return entry html when <div entry></div> tags used
    angular.module('entry', [])
            .directive('entry', entry);

    function entry() {

        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/views/Progress/progressIndexEntry.html'
        };
    }

})();