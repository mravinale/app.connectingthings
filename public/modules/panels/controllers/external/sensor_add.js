'use strict';

angular.module('app')
    .controller('PanelSensorAddCtrl', function ($scope,$rootScope, sensorService) {

        $scope.sensor = { };

        $scope.save = function(form) {
            $scope.errors = {};

            sensorService.create($scope.sensor)
                .success(function (response, status, headers, config) {
                    //$rootScope.$broadcast('reload-tableParams');
                    $scope.$previousStep();

                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };




    });
