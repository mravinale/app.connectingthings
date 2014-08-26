'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelAddCtrl', function ($scope, panelService, deviceService, cameraService, $location) {

        $scope.panel = {
            sensor: null,
            device: null,
            camera: null
        }

        $scope.submit = function() {
            $scope.errors = {};

            panelService.create($scope.panel)
                .success(function (response, status, headers, config) {
                    $location.path("/panel/list");
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });

        };

        $scope.$watch('panel.device', function(deviceId) {

            deviceService.getFullById(deviceId)
                .success(function (response, status, headers, config) {
                    $scope.sensors = response.sensors;
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        });

        $scope.$watch('panel.camera', function(camera) {

            if(camera) {
                $scope.panel.sensor = null;
                $scope.panel.device = null;
            }

        });

        $scope.$watch('panel.sensor', function(sensor) {

            if(sensor) {
                $scope.panel.camera = null;
            }

        });

        deviceService.getAllDevices()
            .success(function (response, status, headers, config) {
                $scope.devices = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        cameraService.getAllCameras()
            .success(function (response, status, headers, config) {
                $scope.cameras = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function (error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });


});
