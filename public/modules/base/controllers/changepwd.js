'use strict';

angular.module('app').controller('ChangePwdCtrl', function ($scope,$rootScope, $location, sessionService,$localStorage) {

    $scope.guid = $location.search().guid;
    $rootScope.enableExternal = true;

    $scope.changePassword = function(form) {
        $scope.errors = {};
        $scope.submitted = true;


        if(!$scope.password){
          form["password"].$setValidity('mongoose', false);
          $scope.errors["password"] = "Field required";

          return;
        }

        if(!$scope.password2){
          form["password2"].$setValidity('mongoose', false);
          $scope.errors["password2"] = "Field required";

          return;
        }

        if($scope.password !== $scope.password2){
          form["password"].$setValidity('mongoose', false);
          $scope.errors["password"] = "Password does not not match";

          form["password2"].$setValidity('mongoose', false);
          $scope.errors["password2"] = "Password does not not match";
          return;
        }

        sessionService.confirmPwd({
          guid: $scope.guid,
          pwd: $scope.password
        })
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