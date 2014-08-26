'use strict';
angular.module('meanp')
    .controller('CameraEditCtrl', function ($scope, $routeParams, cameraService, sensorService, $location) {

        cameraService.getById($routeParams.id)
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
                    $location.path("/camera/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        };

    });
