'use strict';

angular.module('app')
    .controller('paymentCtrl', function ($scope, $rootScope, $modalInstance, userService, userId, alerts, StripeCheckout) {

// https://developer.paypal.com/developer/accounts/
        // https://github.com/paypal/paypal-checkout/blob/master/demo/angular.htm
        $scope.bronzeOpts = {
            env: 'sandbox',
            client: {
                sandbox:    'AYyvy0l6m77P_7kxM8WTRtoG3iEysrBU_IPfkNptk8fJOfoOAo0ndKCYm4nEKPsqJHZgkSeWst_zVN2W',
                production: 'AYASyoowgmSMw064-bNvk6wTS6PafxrJmkvPmLTAqeMFKVUXg_BPEuW3XoJtRUl5sZxooWUDwagRZvds'
            },
            payment: function() {
                var env    = this.props.env;
                var client = this.props.client;
                return paypal.rest.payment.create(env, client, {
                    transactions: [
                        {
                            amount: { total: '5.00', currency: 'USD' }
                        }
                    ]
                });
            },
            commit: true, // Optional: show a 'Pay Now' button in the checkout flow
            onAuthorize: function(data, actions) {
                // Optional: display a confirmation page here
               // console.log(data);
               // console.log(actions)
                return actions.payment.execute().then(function() {
                    console.log("Got payment token: " + data.paymentToken);

                    $scope.user.stripeToken = data.paymentID;
                    $scope.user.accountType = "Bronze";

                    userService.update($scope.user)
                    .success(function (response, status, headers, config) {
                        $rootScope.currentUser.accountType = $scope.user.accountType;
                        $modalInstance.close();
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response);
                    });
                });
            }
        };

        $scope.silverOpts = {
            env: 'sandbox',
            client: {
                sandbox:    'AYyvy0l6m77P_7kxM8WTRtoG3iEysrBU_IPfkNptk8fJOfoOAo0ndKCYm4nEKPsqJHZgkSeWst_zVN2W',
                production: 'AYASyoowgmSMw064-bNvk6wTS6PafxrJmkvPmLTAqeMFKVUXg_BPEuW3XoJtRUl5sZxooWUDwagRZvds'
            },
            payment: function() {
                var env    = this.props.env;
                var client = this.props.client;
                return paypal.rest.payment.create(env, client, {
                    transactions: [
                        {
                            amount: { total: '10.00', currency: 'USD' }
                        }
                    ]
                });
            },
            commit: true, // Optional: show a 'Pay Now' button in the checkout flow
            onAuthorize: function(data, actions) {
                // Optional: display a confirmation page here

                // console.log(data);
                // console.log(actions)
                return actions.payment.execute().then(function() {
                    console.log("Got payment token: " + data.paymentToken);

                    $scope.user.stripeToken = data.paymentID;
                    $scope.user.accountType = "Silver";

                    userService.update($scope.user)
                        .success(function (response, status, headers, config) {
                            $rootScope.currentUser.accountType = $scope.user.accountType;
                            $modalInstance.close();
                        })
                        .error(function(response, status, headers, config) {
                            console.log(response);
                        });
                });

            }
        };


        $scope.goldOpts = {
            env: 'sandbox',
            client: {
                sandbox:    'AYyvy0l6m77P_7kxM8WTRtoG3iEysrBU_IPfkNptk8fJOfoOAo0ndKCYm4nEKPsqJHZgkSeWst_zVN2W',
                production: 'AYASyoowgmSMw064-bNvk6wTS6PafxrJmkvPmLTAqeMFKVUXg_BPEuW3XoJtRUl5sZxooWUDwagRZvds'
            },
            payment: function() {
                var env    = this.props.env;
                var client = this.props.client;
                return paypal.rest.payment.create(env, client, {
                    transactions: [
                        {
                            amount: { total: '15.00', currency: 'USD' }
                        }
                    ]
                });
            },
            commit: true, // Optional: show a 'Pay Now' button in the checkout flow
            onAuthorize: function(data, actions) {
                // Optional: display a confirmation page here
                //console.log(data);
                //console.log(actions)
                return actions.payment.execute().then(function() {

                    console.log("Got payment token: " + data.paymentToken);

                    $scope.user.stripeToken = data.paymentID;
                    $scope.user.accountType = "Silver";

                    userService.update($scope.user)
                        .success(function (response, status, headers, config) {
                            $rootScope.currentUser.accountType = $scope.user.accountType;
                            $modalInstance.close();
                        })
                        .error(function(response, status, headers, config) {
                            console.log(response);
                        });
                });

            }
        };




        $scope.user = { };
        var alert = null;
        var handler = null;


/*
        StripeCheckout.load()
            .then(function(result){
                debugger;
                handler = StripeCheckout.configure({
                    name: "ConnectingThings",
                    image: "assets/img/logo.png",
                    locale:"auto",
                    token: function(token, args) {
                        // $log.debug("Got stripe token: " + token.id);
                    }
                });

            })
            .catch(function(response, status, headers, config) {
                console.log(response);
                alert = alerts.create("An error has occurred, try again", 'danger');
            });
*/
        userService.getById(userId)
            .success(function (response, status, headers, config) {
                $scope.user = response;
                console.log(response);

            })
            .error(function(response, status, headers, config) {
                console.log(response);
                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        $scope.doBronzeCheckout = function() {

            if(!$scope.isAccountReady ("Bronze")) return;

            handler.open({
                description: "Bronze Plan",
                amount: 500
            })
            .then(function(result) {
                console.log("Got Stripe token: " + result[0].id);

                $scope.user.stripeToken = result[0].id;
                $scope.user.accountType = "Bronze";

                userService.update($scope.user)
                    .success(function (response, status, headers, config) {
                        $rootScope.currentUser.accountType = $scope.user.accountType;
                        $modalInstance.close();
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response);
                    });
            },function() {
                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.doSilverCheckout = function() {

            if(!$scope.isAccountReady ("Silver")) return;

            handler.open({
                description: "Silver Plan",
                amount: 1000
            })
            .then(function(result) {
                console.log("Got Stripe token: " + result[0].id);

                $scope.user.stripeToken = result[0].id;
                $scope.user.accountType = "Silver";

                userService.update($scope.user)
                    .success(function (response, status, headers, config) {
                        $rootScope.currentUser.accountType = $scope.user.accountType;
                        $modalInstance.close();
                    })
                    .error(function(response, status, headers, config) {
                        alert = alerts.create("An error has occurred, try again", 'danger');
                    });
            },function() {
                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.doGoldCheckout = function(token) {

            if(!$scope.isAccountReady ("Gold")) return;

            handler.open({
                description: "Golden Plan",
                amount: 1500
            })
            .then(function(result) {
                console.log("Got Stripe token: " + result[0].id);

                $scope.user.stripeToken = result[0].id;
                $scope.user.accountType = "Gold";

                userService.update($scope.user)
                    .success(function (response, status, headers, config) {
                        $rootScope.currentUser.accountType = $scope.user.accountType;
                        $modalInstance.close();
                    })
                    .error(function(response, status, headers, config) {
                        alert = alerts.create("An error has occurred, try again", 'danger');
                    });
            },function() {
                alert = alerts.create("An error has occurred, try again", 'danger');
            });


        };

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

        $scope.isAccountReady = function(newAccountType){

            if($scope.user.accountType =="Silver" && newAccountType == "Bronze" &&
                ($scope.user.statistics.devices >= 5 || $scope.user.statistics.sensors >= 10) ){
                alert = alerts.create("you should have less than 5 devices and 10 sensors", 'danger');
                return false;
            }

            if($scope.user.accountType =="Gold" && newAccountType == "Bronze" &&
                ($scope.user.statistics.devices >= 5 || $scope.user.statistics.sensors >= 10) ){
                alert = alerts.create("you should have less than 5 devices and 10 sensors", 'danger');
                return false;
            }

            if($scope.user.accountType =="Gold" && newAccountType == "Silver" &&
                ($scope.user.statistics.devices >= 10 || $scope.user.statistics.sensors >= 15) ){
                alert = alerts.create("you should have less than 10 devices and 15 sensors", 'danger');
                return false;
            }

            return true;

        }

    });
