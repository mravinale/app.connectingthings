'use strict';
angular.module('meanp')
    .controller('DashboardEditCtrl', function ($scope, $routeParams, dashboardService, sectionService, $location) {

        dashboardService.getById($routeParams.id)
            .success(function (response, status, headers, config) {
                $scope.dashboard = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(){
            $scope.errors = {};

            dashboardService.update($scope.dashboard)
                .success(function (response, status, headers, config) {
                    $location.path("/dashboard/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        }

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
