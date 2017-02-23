'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('app')
    .controller('PanelEditCtrl', function ($scope, $routeParams, panelService, dashboardService, deviceService, cameraService, $location, $localStorage) {

        $scope.panel = { };

        var params =  $location.search();

        $scope.addSensor = function(){
          $location.search({ id: 2, panelId: params.panelId, deviceId: $scope.panel.device });
        };

        $scope.addDevice = function(){
          $location.search({ id: 3, panelId: params.panelId });
        };

        panelService.getById(params.panelId)
            .success(function(response, status, headers, config) {
                $scope.panel = response;
                $scope.panel.dashboard = $localStorage.currentDashboard.id
            }).error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.message;
                });
            });

        deviceService.getAllDevices()
            .success(function(response, status, headers, config) {
                $scope.devices = response;
                $scope.panel.device = params.deviceId? params.deviceId : ( $scope.panel.device?  $scope.panel.device :  $scope.devices[0]._id);
            }).error(function(response, status, headers, config) {
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

        $scope.save = function(form) {
            $scope.errors = {};

            panelService.update($scope.panel)
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
                    $scope.panel.sensor = params.sensorId? params.sensorId : ($scope.panel.sensor ? $scope.panel.sensor : $scope.sensors[0]._id);
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
            }

        });

        $scope.$watch('panel.sensor', function(sensor) {

            if(sensor) {
                $scope.panel.camera = null;
            }

        });


    });
