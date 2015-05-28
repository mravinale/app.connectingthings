'use strict';
angular.module('app')
    .controller('UserEditCtrl', function ($scope, $routeParams, userService, $localStorage, $modalInstance, userId, organizationService) {

        $scope.user = { };

				$scope.updateOrganization = function(form) {
					form.organization.$error.mongoose = false;
				};

        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};
            userService.update($scope.user)
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

        organizationService.getAllOrganizations()
            .success(function (response, status, headers, config) {
                $scope.organizations = response;
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
