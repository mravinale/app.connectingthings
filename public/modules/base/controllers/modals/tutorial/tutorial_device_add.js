'use strict';

angular.module('app')
    .controller('TutorialDeviceAddCtrl', function ($scope,$rootScope, deviceService, sensorService, $location) {

        var alert = null;
        $scope.device = { };

        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                  $rootScope.$broadcast('reload-tableParams');
                  $scope.$nextStep();
                })
                .error(function(response, status, headers, config) {
                    if(!response.errors && response.message){
                        alert= alerts.create(response.message, 'danger');
                    }
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

            $scope.autocomplete = function(form) {

              $scope.device = {
                name: "arduino",
                description: "Arduino Demo",
                sensors:[$scope.sensors[0]._id]
              }

            }


    });
