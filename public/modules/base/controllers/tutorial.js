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
        templateUrl: '/modules/base/views/modals/templates/tutorial_panel_add.html',
        controller: 'TutorialPanelAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/templates/tutorial_section_add.html',
        controller: 'TutorialSectionAddCtrl'
      },
      {
        templateUrl: '/modules/base/views/modals/templates/tutorial_dashboard_add.html',
        controller: 'TutorialDashboardAddCtrl'
      }
    ];

  });
