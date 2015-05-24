'use strict';

angular.module('app')
    .controller('SensorAddCtrl', function ($scope, sensorService,$location, $modalInstance) {

        $scope.sensor = { };

        $scope.save = function(form) {
            $scope.errors = {};

           sensorService.create($scope.sensor)
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
