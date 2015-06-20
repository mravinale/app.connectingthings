'use strict';
angular.module('app')
    .controller('DashboardEditCtrl', function ($scope, $routeParams, dashboardService, sectionService, $location, $modalInstance, dashboardId) {

        $scope.dashboard = { };

        dashboardService.getById(dashboardId)
            .success(function (response, status, headers, config) {
                $scope.dashboard = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            dashboardService.update($scope.dashboard)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
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
                    $scope.errors[field] = error.message;
                });
            });


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
