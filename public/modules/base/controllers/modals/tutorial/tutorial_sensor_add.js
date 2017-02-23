'use strict';

angular.module('app')
    .controller('TutorialSensorAddCtrl', function ($scope,$rootScope, sensorService) {

        var alert = null;
        $scope.sensor = { };

        $scope.save = function(form) {
            $scope.errors = {};

           sensorService.create($scope.sensor)
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

    $scope.autocomplete = function(form) {

      $scope.sensor = {
        name: "Temperature",
        tag: "temperature",
        description:"Temperature Sensor Demo"
      }

    }



    });
