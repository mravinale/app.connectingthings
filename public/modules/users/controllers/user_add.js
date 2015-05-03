'use strict';

angular.module('app')
    .controller('UserAddCtrl', function ($scope, userService,$location, $modalInstance, $rootScope) {

        $scope.user = {organization: $rootScope.currentUser.organizationName };
        $scope.errors = {};

        $scope.save = function() {

           userService.create($scope.user)
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
