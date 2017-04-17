'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('TriggerAddCtrl', function ($scope, $rootScope,$filter, triggerService, deviceService, cameraService, $location, $modalInstance ) {

    $scope.trigger = { threshold: 300 };

      $scope.$watch('trigger.name', function() {
        $scope.trigger.name= $filter('lowercase')($scope.trigger.name);
      });


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
          $scope.trigger.sensor = response.sensors[0]._id;
        }).error(function (response, status, headers, config) {
          angular.forEach(response.errors, function (error, field) {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
    });

      $scope.$watch('trigger.action', function (action) {
        if(action=='Send email to') {
          $scope.trigger.target = $rootScope.currentUser.email;
        }else if(action=='Send to IFTTT'){
            $scope.trigger.target = $rootScope.currentUser.iftt;
          }

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
