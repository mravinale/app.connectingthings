'use strict';
angular.module('app')
    .controller('OrganizationEditCtrl', function ($scope, $routeParams, organizationService, $localStorage, $modalInstance, organizationId) {

        $scope.organization = { };

        organizationService.getById(organizationId)
            .success(function (response, status, headers, config) {
                $scope.organization = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            organizationService.update($scope.organization)
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

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
