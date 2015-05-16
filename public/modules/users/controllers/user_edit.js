'use strict';
angular.module('app')
    .controller('UserEditCtrl', function ($scope, $routeParams, userService, $localStorage, $modalInstance, userId) {

        $scope.user = { };

        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(){
            $scope.errors = {};

            userService.update($scope.user)
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
