'use strict';
angular.module('meanp')
    .controller('DeviceEditCtrl', function ($scope, $routeParams, deviceService,$location) {

        $scope.addSensor = function(sensor){
            $scope.device.sensors.push(sensor);
        };
        $scope.addActuator = function(actuator){
            $scope.device.actuators.push(actuator);
        };


        deviceService.getById($routeParams.id)
            .success(function (response, status, headers, config) {
                $scope.device = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(){
            $scope.errors = {};

            deviceService.update($scope.device)
                .success(function (response, status, headers, config) {
                    $location.path("/device/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        }

    });
