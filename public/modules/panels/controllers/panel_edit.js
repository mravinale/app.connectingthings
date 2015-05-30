'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelEditCtrl', function ($scope, $routeParams, panelService, deviceService, cameraService, $location, $modalInstance , panelId) {

        $scope.panel = { };

        panelService.getById(panelId)
            .success(function(response, status, headers, config) {
                $scope.panel = response
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
                $scope.panel.device = $scope.devices[0]?  $scope.devices[0]._id : null;
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.save = function(form) {
            $scope.errors = {};

            panelService.update($scope.panel)
                .success(function(response, status, headers, config) {
                    $modalInstance.close();
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        };

        $scope.$watch('panel.device', function(deviceId) {

            deviceService.getFullById(deviceId)
                .success(function(response, status, headers, config) {
                    $scope.sensors = response.sensors;
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });
        });

        $scope.$watch('panel.camera', function(camera) {

            if(camera) {
                $scope.panel.sensor = null;
                $scope.panel.device = null
            }

        });

        $scope.$watch('panel.sensor', function(sensor) {

            if(sensor) {
                $scope.panel.camera = null
            }

        });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        cameraService.getAllCameras()
            .success(function(response, status, headers, config) {
                $scope.cameras = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };


    });
