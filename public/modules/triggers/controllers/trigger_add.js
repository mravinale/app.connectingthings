'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('TriggerAddCtrl', function ($scope, triggerService, deviceService, cameraService, $location, $modalInstance ) {

    $scope.trigger = { threshold: 300 };

    $scope.save = function (form) {
      $scope.errors = {};

      triggerService.create($scope.trigger)
        .success(function (response, status, headers, config) {
          $modalInstance.close();
        }).error(function (response, status, headers, config) {
          angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    };

    $scope.$watch('trigger.device', function (deviceId) {

      deviceService.getFullById(deviceId)
        .success(function (response, status, headers, config) {
          $scope.sensors = response.sensors;
        }).error(function (response, status, headers, config) {
          angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    });

    deviceService.getAllDevices()
      .success(function (response, status, headers, config) {
        $scope.devices = response;
        $scope.trigger.device = $scope.devices[0] ? $scope.devices[0]._id : null;
      })
      .error(function (response, status, headers, config) {
        angular.forEach(response.errors, function (error, field) {
          form[field].$setValidity('mongoose', false);
          $scope.errors[field] = error.message;
        });
      });

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

  });
