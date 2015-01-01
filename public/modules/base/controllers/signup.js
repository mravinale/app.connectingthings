'use strict';

angular.module('app').controller('SignupCtrl', function ($scope,$rootScope, $location, sessionService) {

		$scope.register = function(form) {
            $scope.errors = {};

            sessionService.create($scope.user)
                .success(function (response, status, headers, config) {
                 //   $rootScope.currentUser = response;
                 //   $sessionStorage.currentUser = $rootScope.currentUser;
                    debugger;
                    $location.path('/login').search( {'message': 'Check your email for complete your sign up process'});
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

	    };
});