'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelAddCtrl', function ($scope, panelService, deviceService, cameraService, dashboardService, $location, $localStorage) {

        $scope.panel = { isPublic: true, dashboard: $localStorage.currentDashboard.id };

        $scope.addSensor = function(){
            $location.path('/app/panel/list').search('id', 2);
        };

        $scope.addDevice = function(){
            $location.path('/app/panel/list').search('id', 3);
        };

        $scope.save = function(form) {
            $scope.errors = {};

            panelService.create($scope.panel)
                .success(function(response, status, headers, config) {
                    $scope.$finish();
                }).error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.message;
                    });
                });

        };

        $scope.$watch('panel.device', function(deviceId) {

            if(!deviceId) return;

            deviceService.getFullById(deviceId)
                .success(function(response, status, headers, config) {
                    $scope.sensors = response.sensors;
                    $scope.panel.sensor = $scope.sensors[0]? $scope.sensors[0]._id : null;
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
                $scope.panel.device = null;
                $scope.panel.section = null;
            }

        });

        $scope.$watch('panel.sensor', function(sensor) {

            if(sensor) {
                $scope.panel.camera = null;
                $scope.panel.section = null;
            }

        });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
                $scope.panel.device = $scope.devices[0]?  $scope.devices[0]._id : null;
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

        dashboardService.getAllDashboards()
            .success(function(response, status, headers, config) {
                $scope.dashboards = response;
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });


    });
