!function(){"use strict";angular.module("appDiary",["ngAnimate","mgcrea.ngStrap","simpleControls","entry","macro","chart.js","ngRoute"]).config(["$routeProvider","$locationProvider",function(e,r){e.when("/",{templateUrl:"/views/Entries/diaryIndex.html"}),e.when("/search/:mealId",{controller:"addController",controllerAs:"vm",templateUrl:"/views/Entries/diaryIndexSearchView.html"}),e.when("/editor/:entryId",{controller:"entryEditorController",controllerAs:"vm",templateUrl:"/views/Entries/diaryIndexEditor.html"}),e.when("/create",{controller:"createController",controllerAs:"vm",templateUrl:"/views/Entries/diaryIndexCreateNewFood.html"}),e.otherwise({redirectTo:"/"})}])}();