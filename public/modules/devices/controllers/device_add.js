'use strict';

angular.module('app')
    .controller('DeviceAddCtrl', function ($scope, deviceService, sensorService, $modalInstance, $location) {

        $scope.device = { };

        $scope.save = function() {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
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
                    $scope.errors[field] = error.type;
                });
            });

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
