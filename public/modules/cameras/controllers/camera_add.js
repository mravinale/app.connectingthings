'use strict';

angular.module('meanp')
    .controller('CameraAddCtrl', function ($scope, cameraService, sensorService, $location) {

        $scope.save = function() {
            $scope.errors = {};

            cameraService.create($scope.camera)
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
