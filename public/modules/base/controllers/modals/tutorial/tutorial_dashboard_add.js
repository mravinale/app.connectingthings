'use strict';

angular.module('app')
    .controller('TutorialDashboardAddCtrl', function ($scope, $rootScope, dashboardService, sectionService) {

    $scope.dashboard = { };

    $scope.save = function (form) {
        $scope.errors = {};

        dashboardService.create($scope.dashboard)
        .success(function (response, status, headers, config) {
            $rootScope.$broadcast('reload-tableParams');
            $rootScope.$broadcast('reload-myDashboard');
            $scope.$finish();
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

    $scope.autocomplete = function() {

      $scope.dashboard = {
        description: "Demo Dashboard",
        name: "Demo",
        sections: [$scope.sections[0]._id],
        isPublic: true
      }

    }

});
