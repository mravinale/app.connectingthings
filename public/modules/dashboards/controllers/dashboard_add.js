'use strict';

angular.module('app')
    .controller('DashboardAddCtrl', function ($scope, dashboardService, sectionService, $location, $modalInstance) {

    $scope.dashboard = { };

    $scope.save = function (form) {
        $scope.errors = {};

        dashboardService.create($scope.dashboard)
        .success(function (response, status, headers, config) {
            $modalInstance.close();
        }).error(function (response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.message;
            });
        });

    };

    sectionService.getAllSections()
    .success(function (response, status, headers, config) {
        $scope.sections = response;
    }).error(function (response, status, headers, config) {
        angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
        });
    });

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});
