'use strict';

angular.module('meanp')
  .controller('LoginCtrl', function ($scope, $rootScope,sessionService,$sessionStorage, $location) {
    $scope.errors =  {};
    $scope.submitted = false;

    $scope.login = function(form) {
        $scope.submitted = true;
        if(form.email.$error.required) return;

        sessionService.create('password',$scope.user)
            .success(function (response, status, headers, config) {
                $sessionStorage.currentUser = response;
                $rootScope.currentUser =  $sessionStorage.currentUser;
                $location.path('/');
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
                $scope.errors.other = response.message;
            });
    };
  });