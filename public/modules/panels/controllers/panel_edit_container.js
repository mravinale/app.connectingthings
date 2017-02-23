
'use strict';

angular.module('app')
    .controller('PanelEditContainerCtrl', function ($scope, $rootScope, panelId, $location) {

        $scope.user = {
            showTutorial: $rootScope.currentUser.showTutorial,
            _id: $rootScope.currentUser._id,
            username: $rootScope.currentUser.username,
            email: $rootScope.currentUser.email,
            panelId: panelId
        };

        $location.search({ panelId:panelId });


        $scope.steps = [
            {
                templateUrl: '/modules/panels/views/external/panel_edit.html',
                controller: 'PanelEditCtrl'
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
