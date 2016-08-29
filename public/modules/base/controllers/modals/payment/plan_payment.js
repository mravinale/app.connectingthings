
'use strict';
//http://www.bootply.com/80183
angular.module('app')
    .controller('PlanPaymentCtrl', function ($scope, $rootScope, dashboardService, sectionService) {

        $scope.save = function (form) {
            $scope.$nextStep();
        };

    });
