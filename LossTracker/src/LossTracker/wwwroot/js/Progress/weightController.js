// weightController.js -- Display weight progress & goals on chart
(function () {

    'use strict';

    angular.module("appProgress")
            .controller("weightController", weightController);

    function weightController() {

        var vm = this;

        vm.noEntries = true;
    }

})();