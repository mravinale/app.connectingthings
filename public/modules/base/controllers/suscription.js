'use strict';

angular.module('app').controller('SuscriptionCtrl', function ($scope,$rootScope, $location, sessionService) {

    $scope.init = function(form) {

        $scope.isButtonLoginEnabled = false;
        $scope.isButtonSignupEnabled = false;

        if($location.search().message){
            $scope.message = $location.search().message;
            $scope.isButtonLoginEnabled = false;
            $scope.isButtonSignupEnabled = false;
        }
        if($location.search().confirmation){

            var confirmationId = $location.search().confirmation;

            sessionService.confirmUser(confirmationId)
                .success(function (response, status, headers, config) {
                    if(response === null){
                        $scope.message = 'Sorry, this confirmation has expired, create a new account';
                        $scope.isButtonSignupEnabled = true;
                    } else {
                        $scope.message = 'Congratulations, now you are able to login!';
                        $scope.isButtonLoginEnabled = true;
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

    $scope.init();
});