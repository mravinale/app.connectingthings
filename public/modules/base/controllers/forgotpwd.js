'use strict';

angular.module('app').controller('ForgotPwdCtrl', function ($scope,$rootScope, $location, sessionService,$localStorage, reCAPTCHA) {

    $rootScope.enableExternal = true;

    $scope.sendChangePwdEmail = function(form) {
        $scope.errors = {};
        $scope.submitted = true;

        sessionService.sendChangePwdEmail($scope.email)
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $localStorage.$reset();
            $location.path('/access/signin').search({});
        })

        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
        });

    };
});