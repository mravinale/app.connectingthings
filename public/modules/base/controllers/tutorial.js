'use strict';

angular.module('app')
  .controller('tutorialCtrl', function ($scope, deviceService, sensorService, $modalInstance, $location) {

    $scope.steps = [
      {
        templateUrl: '/modules/base/views/modals/templates/tutorial_sensor_add.html',
        controller: 'TutorialSensorAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/templates/tutorial_device_add.html',
        controller: 'TutorialDeviceAddCtrl'
      },

      {
        templateUrl: '/modules/panels/views/panel_add.html',
        isolatedScope: true,
        controller: 'PanelAddCtrl'
      }
    ];

  });
