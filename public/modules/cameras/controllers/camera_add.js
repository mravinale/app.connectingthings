'use strict';

angular.module('app')
    .controller('CameraAddCtrl', function ($scope, cameraService, sensorService, $location, $modalInstance ) {

        $scope.camera = { };

        $scope.save = function() {
            $scope.errors = {};

            cameraService.create($scope.camera)
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
