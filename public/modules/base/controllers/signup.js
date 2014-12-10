'use strict';

angular.module('app').controller('SignupCtrl', function ($scope,$rootScope, $location, userService, $sessionStorage) {

		$scope.register = function(form) {
            $scope.errors = {};

            userService.create($scope.user)
                .success(function (response, status, headers, config) {
                    $rootScope.currentUser = response;
                    $sessionStorage.currentUser = $rootScope.currentUser;
                    $location.path('/');
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

	    };
});