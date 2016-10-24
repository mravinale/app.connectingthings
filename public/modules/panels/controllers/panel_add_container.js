
'use strict';

angular.module('app')
    .controller('PanelAddContainerCtrl', function ($scope, $rootScope) {

        $scope.user = {
            showTutorial: $rootScope.currentUser.showTutorial,
            _id: $rootScope.currentUser._id,
            username: $rootScope.currentUser.username,
            email: $rootScope.currentUser.email
        };



        $scope.steps = [
            {
                templateUrl: '/modules/panels/views/external/panel_add.html',
                controller: 'PanelAddCtrl'
            },
            {
                templateUrl: '/modules/panels/views/external/sensor_add.html',
                controller: 'PanelSensorAddCtrl'
            },
            {
                templateUrl: '/modules/panels/views/external/device_add.html',
                controller: 'PanelDeviceAddCtrl'
            }

        ];

    });
