'use strict';

angular.module('app')
    .controller('DashboardAddCtrl', function ($scope, dashboardService, sectionService, $location) {

        $scope.save = function() {
            $scope.errors = {};

            dashboardService.create($scope.dashboard)
                .success(function (response, status, headers, config) {
                    $location.path("/dashboard/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

        sectionService.getAllSections()
            .success(function (response, status, headers, config) {
                $scope.sections = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

    });
