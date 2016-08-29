'use strict';

angular.module('app')
    .controller('paymentCtrl', function ($scope, $rootScope, deviceService, sensorService, $modalInstance, userService) {

        $scope.user = {
            _id: $rootScope.currentUser._id,
            username: $rootScope.currentUser.username,
            email: $rootScope.currentUser.email
        };

        $scope.steps = [
            {
                templateUrl: '/modules/base/views/modals/payment/select_plan.html',
                controller: 'SelectPlanCtrl'
            },
            {
                templateUrl: '/modules/base/views/modals/payment/plan_payment.html',
                controller: 'PlanPaymentCtrl'
            }


        ];

    });
