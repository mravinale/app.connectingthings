'use strict';

angular.module('meanp')
    .controller('DeviceAddCtrl', function ($scope, deviceService,$location) {

        $scope.device =  {sensors: [], actuators:[]};

        $scope.addSensor = function(sensor){
            $scope.device.sensors.push(sensor);
        };
        $scope.addActuator = function(actuator){
            $scope.device.actuators.push(actuator);
        };

        $scope.submit = function() {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    $location.path("/device/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

    });
