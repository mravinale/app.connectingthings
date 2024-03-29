'use strict';

angular.module('app').controller('SignupCtrl', function ($scope,$rootScope, $location, sessionService,$localStorage, reCAPTCHA) {

    $scope.user = {};
    $scope.submitted = false;
    reCAPTCHA.setPublicKey('6LctfAITAAAAAMCUAZHyTfTb2TE-Nhx7Bb2wJspE');

    //$scope.$watch('user.captcha', function() {
        //$scope.form.error.mongoose = null;
        //$scope.form.$setPristine();
    //},true);

    $scope.register = function(form) {
        $scope.errors = {};
        $scope.submitted = true;

        sessionService.create($scope.user)
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $localStorage.$reset();
            $location.path('/access/suscription').search( {'message': 'Check your email for complete your sign up process'});
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
              //  $scope.submitted = false;
            });
            //$scope.errors.other = response.message;
        });

    };
});