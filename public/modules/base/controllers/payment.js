'use strict';

angular.module('app')
    .controller('paymentCtrl', function ($scope, $rootScope, $modalInstance, userService, userId) {

        $scope.user = { };

        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response;
                console.log(response);
            })
            .error(function(response, status, headers, config) {
                console.log(response);
            });

        $scope.doBronzeCheckout = function(token) {
            console.log("Got Bronze Stripe token: ", token);

            $scope.user.stripeToken = token.id;
            $scope.user.accountType = "Bronze";

            userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });
        };

        $scope.doSilverCheckout = function(token) {
            console.log("Got Silver Stripe token: ", token);

            $scope.user.stripeToken = token.id;
            $scope.user.accountType = "Silver";

            userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });
        };

        $scope.doGoldCheckout = function(token) {
            console.log("Got Gold Stripe token: ", token);

            $scope.user.stripeToken = token.id;
            $scope.user.accountType = "Gold";

            userService.update($scope.user)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
