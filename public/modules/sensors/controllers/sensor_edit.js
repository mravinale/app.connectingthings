'use strict';
angular.module('app')
    .controller('SensorEditCtrl', function ($scope, $routeParams, sensorService, $modalInstance, sensorId) {

        $scope.sensor = { };

        sensorService.getById(sensorId)
            .success(function (response, status, headers, config) {
                $scope.sensor = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form){
            $scope.errors = {};

            sensorService.update($scope.sensor)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
