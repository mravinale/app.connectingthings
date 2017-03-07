'use strict';

//add
angular.module('app')
    .controller('paymentCtrl', function ($scope, $rootScope, $modalInstance, userService, userId, alerts, StripeCheckout, $http) {


        $scope.user = { };
        var alert = null;
        var handler = null;
        var token = "sk_live_sTn2T9WqJhZpGzo5P9yXcNTl";
        //var token = "sk_test_ZEqEfWGLO1W1mJQpQu4bzSwi";

        var formalizer = function(data ){
            var str = [];
            for (var d in data)
                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
            return str.join("&");
        };


        StripeCheckout.load()
            .then(function(result){
                 
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

            userService.getById(userId)
                .success(function (response, status, headers, config) {
                    $scope.user = response;
                    console.log(response);

                })
                .error(function(response, status, headers, config) {
                    console.log(response);
                    alert = alerts.create("An error has occurred, try again", 'danger');
                });

        $scope.doFreeCheckout = function() {

             $http({
                method: 'DELETE',
                url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                headers: {
                    'Authorization': 'Bearer '+token,
                    'Content-Type':'application/x-www-form-urlencoded'
                }
            })
            .then(function(result){

                $scope.user.accountType =  "free";
                $scope.user.subscription =  null;

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

        $scope.doBronzeCheckout = function() {

            if(!$scope.isAccountReady ("bronze")) return;

            handler.open({
                description: "Bronze Plan",
                amount: 100
            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);
                if($scope.user.customerId){
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers/'+ $scope.user.customerId,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })

                } else {
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })
                }

            })
            .then(function(result) {
                    debugger
                $scope.user.customerId =  result.data.id;

                if($scope.user.subscription){

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            plan: 'bronze'
                        })
                    });
                } else {

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            customer: $scope.user.customerId,
                            plan: 'bronze'
                        })
                    });
                }

                })
            .then(function(result){

                $scope.user.accountType =  "bronze";
                $scope.user.subscription =  result.data.id;

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

            if(!$scope.isAccountReady ("silver")) return;

            handler.open({
                description: "Silver Plan",
                amount: 500
            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);
                if($scope.user.customerId){
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers/'+ $scope.user.customerId,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })

                } else {
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })
                }

            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);

                $scope.user.customerId =  result.data.id;

                if($scope.user.subscription){

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            plan: 'silver'
                        })
                    });
                } else {

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            customer:  $scope.user.customerId,
                            plan: 'silver'
                        })
                    });
                }

            })
            .then(function(result){

                $scope.user.accountType =  "silver";
                $scope.user.subscription =  result.data.id;

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

        $scope.doGoldCheckout = function(token) {

            if(!$scope.isAccountReady ("gold")) return;

            handler.open({
                description: "Golden Plan",
                amount: 1000
            })
            .then(function(result) {
                //console.log("Got Stripe token: " + result[0].id);
                if($scope.user.customerId){
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers/'+ $scope.user.customerId,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })

                } else {
                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/customers',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            description: $scope.user.description,
                            email: $scope.user.email,
                            source: result[0].id
                        })
                    })
                }

            })
            .then(function(result) {

                $scope.user.customerId =  result.data.id;

                if($scope.user.subscription){

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions/'+ $scope.user.subscription,
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            plan: 'gold'
                        })
                    });
                } else {

                    return $http({
                        method: 'POST',
                        url: 'https://api.stripe.com/v1/subscriptions',
                        headers: {
                            'Authorization': 'Bearer '+token,
                            'Content-Type':'application/x-www-form-urlencoded'
                        },
                        data: formalizer({
                            customer:  $scope.user.customerId,
                            plan: 'gold'
                        })
                    });
                }

            })
            .then(function(result){

                $scope.user.accountType =  "gold";
                $scope.user.subscription =  result.data.id;

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

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

        $scope.isAccountReady = function(newAccountType){

            if($scope.user.accountType =="silver" && newAccountType == "bronze" &&
                ($scope.user.statistics.devices >= 5 || $scope.user.statistics.sensors >= 10) ){
                alert = alerts.create("you should have less than 5 devices and 10 sensors", 'danger');
                return false;
            }

            if($scope.user.accountType =="gold" && newAccountType == "bronze" &&
                ($scope.user.statistics.devices >= 5 || $scope.user.statistics.sensors >= 10) ){
                alert = alerts.create("you should have less than 5 devices and 10 sensors", 'danger');
                return false;
            }

            if($scope.user.accountType =="gold" && newAccountType == "silver" &&
                ($scope.user.statistics.devices >= 10 || $scope.user.statistics.sensors >= 15) ){
                alert = alerts.create("you should have less than 10 devices and 15 sensors", 'danger');
                return false;
            }

            return true;

        }

    });
