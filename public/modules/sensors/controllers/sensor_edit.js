'use strict';
angular.module('app')
    .controller('SensorEditCtrl', function ($scope, $routeParams, sensorService,$location) {

        sensorService.getById($routeParams.id)
            .success(function (response, status, headers, config) {
                $scope.sensor = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.submit = function(){
            $scope.errors = {};

            sensorService.update($scope.sensor)
                .success(function (response, status, headers, config) {
                    $location.path("/sensor/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        }

    });
