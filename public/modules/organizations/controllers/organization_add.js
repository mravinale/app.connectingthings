'use strict';

angular.module('app')
    .controller('OrganizationAddCtrl', function ($scope, organizationService,$location, $modalInstance) {

        $scope.organization = { };
        $scope.errors = {};

        $scope.save = function(form) {

           organizationService.create($scope.organization)
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
