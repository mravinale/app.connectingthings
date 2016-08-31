'use strict';

angular.module('app')
    .controller('paymentCtrl', function ($scope, $rootScope, deviceService, sensorService, $modalInstance, userService) {

        $scope.doCheckout = function(token) {
            alert("Got Stripe token: " + token.id);
            $modalInstance.close();
        };


    });
