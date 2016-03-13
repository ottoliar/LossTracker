// entry.js -- Directive returning a view for entries
(function () {

    'use strict';

    // Return entry html when <div entry></div> tags used
    angular.module('entry', [])
            .directive('entry', entry);

    function entry() {

        return {
            restrict: 'A',
            replace: true,
            templateUrl: '/views/diaryIndexEntry.html'
        };

    }


})();