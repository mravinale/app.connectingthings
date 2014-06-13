'use strict';

angular.module('meanp')
    .controller('SensorAddCtrl', function ($scope, sensorService,$location) {

        $scope.submit = function() {
            $scope.errors = {};

           sensorService.create($scope.sensor)
                .success(function (response, status, headers, config) {
                    $location.path("/sensor/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

    });
