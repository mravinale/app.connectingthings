
'use strict';

angular.module('app')
    .controller('SelectPlanCtrl', function ($scope, $rootScope, dashboardService, sectionService) {

        $scope.planBronze = function (form) {

                $scope.$nextStep();
        };

        $scope.planSilver = function (form) {
                $scope.$nextStep();
        };

        $scope.planGold = function (form) {
                $scope.$nextStep();
        };


    });
