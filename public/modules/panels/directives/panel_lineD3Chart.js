/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelD3Chart', function (socket, messageService, $modal, $log, $rootScope, SweetAlert, panelService) {
        return {
            scope:{
                yrange:"@",
                topic:"@",
                key:"@",
                name:"@",
                sensor:"@",
                device:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+
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
                    '<div class="panel-body">'+
                        '<div class="text-center" style="margin-top: -35px;">'+
                            '<nvd3-line-chart'+
                                ' data="values"'+
                                ' xAxisTickFormat="xAxisTickFormatFunction()"'+
                                ' yAxisTickFormat="yAxisTickFormatFunction()"'+
                                ' showXAxis="true"'+
                                ' showYAxis="true"'+
                                ' showYAxis="true"'+
                                ' noData="No Data Yet :( "'+
                                ' isArea="true"'+
                                ' tooltips="true"'+
                                ' interactive="true"'+
                                ' tooltipcontent="toolTipContentFunction()"'+
                                ' >'+
                            '</nvd3-line-chart>'+

                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                var items = [];
                var lastValue = null;

                scope.values =[ { "values": [],"key": scope.name, color: '#26A69A' }];
                messageService.getAllMessages(scope.topic)
                    .success(function (response, status, headers, config) {

                        angular.forEach(response, function(message) {
                            var item = angular.fromJson(message);
                            if(!item || !item.value) return;

                            if(item.value  == "0" || item.value  == "1") {
                                if(lastValue == item.value ) return;
                                items.push([moment(item.createdAt).add(-1, "milliseconds").valueOf(), item.value == "1" ? "0" : "1"]);
                            }

                            items.push([ moment(item.createdAt).valueOf(), item.value ]);
                            lastValue = item.value;
                        });

                        if(items.length === 0)  items.push([ moment().valueOf(), "0" ]);

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name, color: '#26A69A' } ];

                    })
                    .error(function(response, status, headers, config) {
                        console.error( response);
                    });

                scope.xAxisTickFormatFunction = function(){
                    return function(d){
                        return d3.time.format('%H:%M:%S')(moment(d).toDate());
                    }
                };
                scope.yAxisTickFormatFunction = function(){
                    return function(d){
                        return d;
                    }
                };
                scope.toolTipContentFunction = function(){
                    return function(key, x, y, e, graph) {
                        return '<p><strong>Time: </strong>' +  x +'</p>'+
                               '<p><strong>Value: </strong>' +  y +'</p>'
                    }
                };

                scope.clean = function(){
                    items = [];

                    if(lastValue  == "0" || lastValue  == "1") {
                      items.push([ moment().add(-1, "milliseconds").valueOf(), lastValue == "1"? "0" : "1"  ]);
                    }
                    items.push([ moment().valueOf(), "0" ]);

                    scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name,color: '#26A69A' } ];
                };

                socket.on(scope.topic, function (message) {

                        var item = angular.fromJson(message);
                        if(!item || !item.value) return;

                        var messageValue = item.value;

                        if(messageValue == "0" || messageValue == "1") {
                            var lastValue = _.sortBy(items, function(o) { return o[0]; })[1] ? _.last(_.sortBy(items, function(o) { return o[0]; }))[1] : "0" ;

                            if(lastValue == messageValue ) return;
                            items.push([moment().add(-1, "milliseconds").valueOf(), messageValue == "1"? "0" : "1" ]);
                        }

                        items.push([ moment().valueOf(), messageValue ]);

                        if(items.length > 20){
                          items = _.rest(_.sortBy(items, function(o) { return o[0]; }));
                        }

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name, color: '#26A69A' } ];

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
