'use strict';

angular.module('app')
    .controller('TutorialDeviceAddCtrl', function ($scope,$rootScope, deviceService, sensorService, $location) {

        $scope.device = { };

        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                  $rootScope.$broadcast('reload-tableParams');
                  $scope.$nextStep()
                })
                .error(function(response, status, headers, config) {
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


    });
