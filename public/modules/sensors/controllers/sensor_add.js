'use strict';

angular.module('app')
    .controller('SensorAddCtrl', function ($scope, sensorService,$location, $modalInstance, $filter, alerts) {

        var alert = null;
        $scope.sensor = { tag:"" };

        $scope.$watch('sensor.tag', function() {
          $scope.sensor.tag= $filter('lowercase')($scope.sensor.tag);
        });

        $scope.save = function(form) {
            $scope.errors = {};

           sensorService.create($scope.sensor)
                .success(function (response, status, headers, config) {
                   $modalInstance.close();
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

        $scope.cancel = function () {
            alerts.dismiss(alert);
            $modalInstance.dismiss('cancel');
        };

    });
