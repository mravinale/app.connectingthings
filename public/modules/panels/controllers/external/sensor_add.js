'use strict';

angular.module('app')
    .controller('PanelSensorAddCtrl', function ($scope, sensorService,$location) {

        var alert = null;
        $scope.sensor = { };


        $scope.save = function(form) {
            $scope.errors = {};

            sensorService.create($scope.sensor)
                .success(function (response, status, headers, config) {
                    $location.path('/app/panel/list').search('id', 1);
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

        $scope.goBack = function(){
            $location.path('/app/panel/list').search('id', 1);
        }


    });