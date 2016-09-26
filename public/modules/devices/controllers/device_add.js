'use strict';

angular.module('app')
    .controller('DeviceAddCtrl', function ($scope, deviceService, sensorService, $modalInstance, $filter,alerts) {

        var alert = null;
        $scope.device = { name:"" };

        $scope.$watch('device.name', function() {
          $scope.device.name = $filter('lowercase')($scope.device.name);
        });


        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        sensorService.getAllSensors()
            .success(function (response, status, headers, config) {
                $scope.sensors = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

    });
