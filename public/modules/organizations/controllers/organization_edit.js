'use strict';
angular.module('app')
    .controller('OrganizationEditCtrl', function ($scope, $routeParams, organizationService, $sessionStorage, $modalInstance, organizationId) {

        $scope.organization = { };

        organizationService.getById(organizationId)
            .success(function (response, status, headers, config) {
                $scope.organization = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(){
            $scope.errors = {};

            organizationService.update($scope.organization)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
