'use strict';

angular.module('app')
  .controller('tutorialCtrl', function ($scope, $rootScope, deviceService, sensorService, $modalInstance, userService) {

    $scope.user = {
      showTutorial: $rootScope.currentUser.showTutorial,
      _id: $rootScope.currentUser._id,
      username: $rootScope.currentUser.username,
      email: $rootScope.currentUser.email
    };

    $scope.$watch(
      "user.showTutorial", function(val) {
        console.log(val)
        userService.update($scope.user)
          .success(function (response, status, headers, config) {
            console.log(response)
          })
          .error(function (response, status, headers, config) {
            console.error(response) //TODO: add logly
          })
      }

    );

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
