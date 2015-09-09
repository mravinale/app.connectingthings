'use strict';

angular.module('app')
  .controller('tutorialCtrl', function ($scope, deviceService, sensorService, $modalInstance, $location) {

    $scope.steps = [
      {
        templateUrl: '/modules/devices/views/device_add.html',
        hasForm: true,
        controller: 'DeviceAddCtrl'
      },
      {
        templateUrl: '/modules/sensors/views/sensor_add.html',
        isolatedScope: true,
        controller: 'SensorAddCtrl'
      },
      {
        templateUrl: '/modules/panels/views/panel_add.html',
        isolatedScope: true,
        controller: 'PanelAddCtrl'
      }
    ];

  });
