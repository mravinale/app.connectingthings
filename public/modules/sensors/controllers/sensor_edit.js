'use strict';
angular.module('meanp')
    .controller('SensorEditCtrl', function ($scope, $routeParams, sensorService,$location) {

        sensorService.getById($routeParams.id)
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

            sensorService.update($scope.sensor)
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
