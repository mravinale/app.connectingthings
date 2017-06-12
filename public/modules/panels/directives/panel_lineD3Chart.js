/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
//Slider-> http://angular-slider.github.io/angularjs-slider/
'use strict';
angular.module('app')
    .directive('panelD3Chart', function (socket, messageService, $modal, $log, $rootScope, SweetAlert, panelService, $location) {
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
                                        '<li><a href ng-click="clean()" >Clean Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="showCode()" >Show Code Example</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel-body">'+
                        '<div class="text-center" style="margin-top: -35px;">'+
                            '<nvd3 options="options" data="values"></nvd3>'+

                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                var items = [];
                var lastValue = null;

                //TODO: work the height
                scope.options = {
                    chart: {
                        type: 'lineChart',
                        height: 300,
                        margin : {
                            top: 20,
                            right: 20,
                            bottom: 40,
                            left: 55
                        },
                        x: function(d){

                            return d.x;
                        },
                        y: function(d){

                            return d.y;
                        },
                        useInteractiveGuideline: true,
                        duration: 500,
                        xAxis: {
                            tickFormat: function(d){
                                return d3.time.format('%H:%M:%S')(moment(d).toDate());
                            }
                        }
                    }
                };

                scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};
                scope.areOptionsEnabled = $location.path() === "/app/dashboard/me";

                scope.values =[ { "values": [],"key": scope.name }];
                messageService.getAllMessages(scope.topic)
                    .success(function (response, status, headers, config) {

                        angular.forEach(response, function(message) {
                            var item = angular.fromJson(message);
                            if(!item || !item.value) return;

                            if(item.value  == "0" || item.value  == "1") {
                                if(lastValue == item.value ) return;
                                items.push({ x: moment(item.createdAt).add(-1, "milliseconds").valueOf(), y: item.value == "1" ? "0" : "1"});
                            }

                            items.push({ x: moment(item.createdAt).valueOf(), y: parseInt(item.value) });
                            lastValue = item.value;
                        });

                        if(items.length === 0)  items.push({ x:moment().valueOf(), y: 0 });

                        scope.values =  [ { values: _.sortBy(items, function(item) { return item.x; }), key: scope.name, color: '#26A69A',area: true } ];

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
                      items.push({ x: moment().add(-1, "milliseconds").valueOf(), y: lastValue == "1"? "0" : "1"  });
                    }
                    items.push({ x: moment().valueOf(), y: 0 });

                    scope.values =  [ { "values": _.sortBy(items, function(o) { return o.x; }), "key": scope.name, color: '#26A69A',area: true } ];
                };

                socket.on(scope.topic, function (message) {

                        var item = angular.fromJson(message);
                        if(!item || !item.value) return;

                        var messageValue = item.value;

                        if(messageValue == "0" || messageValue == "1") {
                            var lastValue = _.sortBy(items, function(o) { return o.x; }) ? _.last(_.sortBy(items, function(o) { return o.x; })).y : "0" ;

                            if(lastValue == messageValue ) return;
                            items.push({ x: moment().add(-1, "milliseconds").valueOf(), y: messageValue == "1"? "0" : "1" });
                        }

                        items.push({ x:moment().valueOf(), y:messageValue });

                        if(items.length > 10){
                          items = _.rest(_.sortBy(items, function(o) { return o.x; }));
                        }

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o.x; }), "key": scope.name, color: '#26A69A',area: true } ];

                });

                scope.showCode = function(){
                    $modal.open({
                        templateUrl: '../modules/panels/views/panel_code.html',
                        controller: 'PanelCodeCtrl',
                        size: 'lg',
                        resolve: {
                            host: function () {
                                return "app.connectingthings.io";
                            },
                            topic: function () {
                                return "key/"+scope.topic.split("/")[1]+"/device/"+scope.topic.split("/")[2]+"/tag/"+scope.topic.split("/")[3];
                            },
                            value: function () {
                                return  "12";
                            }
                        }
                    });
                };

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
