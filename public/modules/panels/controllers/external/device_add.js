'use strict';

angular.module('app')
    .controller('PanelDeviceAddCtrl', function ($scope,$rootScope, deviceService, sensorService, $filter,$location) {

        var alert = null;
        $scope.device = { name:"" };

        var params =  $location.search();

        $scope.$watch('device.name', function() {
            $scope.device.name = $filter('lowercase')($scope.device.name);
        });

        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    params.id = 1;
                    params.deviceId = response._id;
                    $location.search( params );
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
