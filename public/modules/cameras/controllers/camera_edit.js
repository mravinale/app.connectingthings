'use strict';
angular.module('app')
    .controller('CameraEditCtrl', function ($scope, $routeParams, cameraService, sensorService, $location, $modalInstance , cameraId) {

        $scope.camera = { };

        cameraService.getById(cameraId)
            .success(function (response, status, headers, config) {
                $scope.camera = response
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.save = function(){
            $scope.errors = {};

            cameraService.update($scope.camera)
                .success(function (response, status, headers, config) {
                    $modalInstance.close();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };

    });
