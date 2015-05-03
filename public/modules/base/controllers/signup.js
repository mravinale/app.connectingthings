'use strict';

angular.module('app').controller('SignupCtrl', function ($scope,$rootScope, $location, sessionService,$sessionStorage, reCAPTCHA) {

    $scope.user = {};
    $scope.submitted = false;
    reCAPTCHA.setPublicKey('6LctfAITAAAAAMCUAZHyTfTb2TE-Nhx7Bb2wJspE');

    //$scope.$watch('user.captcha', function() {
        //$scope.form.error.mongoose = null;
        //$scope.form.$setPristine();
    //},true);

    $scope.register = function() {
        $scope.errors = {};
        $scope.submitted = true;

        //if($scope.form.$invalid) return

        sessionService.create($scope.user)
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $sessionStorage.$reset();
            $location.path('/access/suscription').search( {'message': 'Check your email for complete your sign up process'});
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
                $scope.form[field].$setValidity('mongoose', false);
                $scope.errors[field] = error.type;
              //  $scope.submitted = false;
            });
            //$scope.errors.other = response.message;
        });

    };
});