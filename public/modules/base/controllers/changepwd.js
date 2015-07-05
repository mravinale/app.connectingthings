'use strict';

angular.module('app').controller('ChangePwdCtrl', function ($scope,$rootScope, $location, sessionService,$localStorage) {

    $scope.guid = $location.search().guid;
    $rootScope.enableExternal = true;

    $scope.changePassword = function(form) {
        $scope.errors = {};
        $scope.submitted = true;

        sessionService.confirmPwd({
          guid: $scope.guid,
          pwd: $scope.password
        })
        .success(function (response, status, headers, config) {
            $rootScope.currentUser = null;
            $localStorage.$reset();
            $location.path('/access/signin');
        })
        .error(function(response, status, headers, config) {
            angular.forEach(response.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
        });

    };
});