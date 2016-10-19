'use strict';

angular.module('app')
    .controller('PanelDeviceAddCtrl', function ($scope,$rootScope, deviceService, sensorService, $filter,$location) {

        var alert = null;
        $scope.device = { name:"" };

        $scope.$watch('device.name', function() {
            $scope.device.name = $filter('lowercase')($scope.device.name);
        });

        $scope.save = function(form) {
            $scope.errors = {};

            deviceService.create($scope.device)
                .success(function (response, status, headers, config) {
                    $location.search( {id: 1, deviceId: response._id} );
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
