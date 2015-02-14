'use strict';
//ng-annotate --add public/modules/base/controllers/login.js -o public/modules/base/controllers/login.js
angular.module('app')
  .controller('LoginCtrl', ["$scope", "$rootScope", "sessionService", "$sessionStorage", "$location", function ($scope, $rootScope,sessionService,$sessionStorage, $location) {
    $scope.errors =  {};
    $scope.submitted = false;

    $scope.init = function(form) {

        if($location.search().message){
            $scope.message = $location.search().message;

        }
        if($location.search().confirmation){

            var confirmationId = $location.search().confirmation;

            sessionService.confirmUser(confirmationId)
                .success(function (response, status, headers, config) {
                    if(response === null){
                        $scope.message = 'Sorry, this confirmation has expired, create a new account';
                    } else {
                        $scope.message = 'Congratulations, now you are able to login!';
                    }

                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                    $scope.errors.other = response.message;
                });
        }

    };

    $scope.login = function(form) {
        $scope.submitted = true;
        if(form.email.$error.required) return;

        sessionService.login('password',$scope.user)
            .success(function (response, status, headers, config) {
                $sessionStorage.currentUser = response
                debugger;
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

    $scope.init();
  }]);