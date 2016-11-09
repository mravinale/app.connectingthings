/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelSwitch', function (socket, panelService, messageService, $modal, $log, $rootScope, SweetAlert, $location) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
                label:"@",
                url:"@",
                protocol:"@",
                tag:"@",
                sensor:"@",
                device:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" ng-style="panelCogStyle" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                        '<li><a href ng-click="editSensor()" >Edit Sensor</a></li>'+
                                        '<li><a href ng-click="editDevice()" >Edit Device</a></li>'+
                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                     '</div>'+
                    '<div class="panel-body text-center" style="margin-bottom: 65px;margin-top: 30px">'+
                        '<span class="toggle">'+
                            '<input checked type="checkbox" ng-model="toggleButton">'+
                                '<label data-off="&#10006;" data-on="&#10004;"></label>'+
                                '<div ng-class="'+"{'led-green' : toggleButton, 'led-off' : !toggleButton }"+'"  style="margin-top: 120px;"></div>'+
                        '</span>'+
                    ' </div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

              var items = [ ];

              scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
              scope.grey= {color:'rgba(0,0,0, 0)'};
              scope.dark= {color:'rgba(0,0,0,.35)'};
              scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

              messageService.getAllMessages(scope.topic)
                .success(function (response, status, headers, config) {
                  angular.forEach(response, function(message) {
                    var item = angular.fromJson(message);
                    if(item && item.value !== 0) {
                      items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                    }

                  });

                  scope.toggleButton =  _.sortBy(items, 'timestamp').reverse()[0] ? _.sortBy(items, 'timestamp').reverse()[0] .value  == "1" : false;
                })
                .error(function(response, status, headers, config) {
                  console.error( response);
                });

                socket.on(scope.topic, function (message) {

                  var messageValue = angular.fromJson(message).value;
                  if(messageValue !== "0" && messageValue !== "1" ) return;

                  scope.toggleButton = messageValue == "1";
                });

                scope.$watch('toggleButton', function(toggle, lastToogle) {

                    if(toggle == lastToogle) return;

                    var infoToSend = {
                        topic:"device/"+scope.topic.split("/")[2]+"/key/"+scope.key,
                        message: {value: (toggle)? "1" : "0", tag: scope.tag }
                    };

                    panelService.command(infoToSend)
                        .success(function (response, status, headers, config) {
                           console.log(response);
                        })
                        .error(function(response, status, headers, config) {
                          console.error( response);
                        });
                });

                scope.editSensor = function(){
                    $modal.open({
                        templateUrl: '../modules/sensors/views/sensor_edit.html',
                        controller: 'SensorEditCtrl',
                        size: 'lg',
                        resolve: {
                            sensorId: function () {
                                return scope.sensor;
                            }
                        }
                    });
                };

                scope.editDevice = function(){
                    $modal.open({
                        templateUrl: '../modules/devices/views/device_edit.html',
                        controller: 'DeviceEditCtrl',
                        size: 'lg',
                        resolve: {
                            deviceId: function () {
                                return scope.device;
                            }
                        }
                    });
                };

                scope.editPanel = function(){
                  var modalInstance = $modal.open({
                    templateUrl: '../modules/panels/views/panel_edit_container.html',
                    controller: 'PanelEditContainerCtrl',
                    size: 'lg',
                    resolve: {
                      panelId: function () {
                        return scope.panel;
                      }
                    }
                  });

                  modalInstance.result.then(function () {
                    $rootScope.$broadcast('reload-myDashboard');
                  }, function () {
                    $log.info('editPanel dismissed at: ' + new Date());
                  });
                };

              scope.deletePanel = function(){
                SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this panel!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                    cancelButtonText: "No, cancel please!"
                  },
                  function(isConfirm) {
                    if (isConfirm) {
                      panelService.remove(scope.panel)
                        .success(function (response, status, headers, config) {
                          $rootScope.$broadcast('reload-myDashboard');
                        }).error(function (response, status, headers, config) {
                        $log.info('error deleting the panel');
                      });
                    }
                  });
              };

            }
        };
    });
