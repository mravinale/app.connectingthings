'use strict';

angular.module('app')
    .controller('PanelSensorAddCtrl', function ($scope, sensorService, deviceService, $location) {

        var alert = null;
        $scope.sensor = { };
        $scope.device = { };
        var params =  $location.search();

        deviceService.getById(params.deviceId)
          .success(function (response, status, headers, config) {
            $scope.device = response
          })
          .error(function(response, status, headers, config) {
            alert= alerts.create("There was an error trying to save the transaction, please try again", 'danger');
          });

        $scope.save = function(form) {
            $scope.errors = {};

          //TODO handle errors
            sensorService.create($scope.sensor)
                .success(function (sensorResponse, status, headers, config) {
                  params.sensorId = sensorResponse._id;
                  $scope.device.sensors.push(sensorResponse._id);

                  deviceService.update($scope.device)
                    .success(function (deviceResponse, status, headers, config) {
                      params.id = 1;
                      $location.search(params);
                    })
                    .error(function(response, status, headers, config) {
                        alert= alerts.create("There was an error trying to save the transaction, please try again", 'danger');
                    });

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
            $location.search('id', 1);
        }


    });
