/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelD3Chart', function (socket, messageService) {
        return {
            scope:{
                yrange:"@",
                topic:"@",
                name:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                        '<div class="pull-right">'+
                            '<div class="btn-group">'+
                                '<button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">Actions <span class="caret"></span></button>'+
                                '<ul class="dropdown-menu pull-right" role="menu">'+
                                    '<li><a href="#">Action</a></li>'+
                                    '<li class="divider"></li><li><a href="#">Separated link</a></li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="panel-body" style="height: 233px;">'+
                        '<div class="text-center" style="margin-top: -35px;">'+
                            '<nvd3-line-chart'+
                                ' data="values"'+
                                ' xAxisTickFormat="xAxisTickFormatFunction()"'+
                                ' yAxisTickFormat="yAxisTickFormatFunction()"'+
                                ' showXAxis="true"'+
                                ' height="260"'+
                                ' showYAxis="true"'+
                                ' useInteractiveGuideLine="true"'+
                                ' noData="No Data Yet :( "'+
                                ' >'+
                            '</nvd3-line-chart>'+

                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                var items = [];
                scope.values =[ { "values": [],"key": scope.name }];
                messageService.getAllMessages(scope.topic)
                    .success(function (response, status, headers, config) {

                        angular.forEach(response, function(message) {
                            var item = angular.fromJson(message.message);
                            items.push([moment(message.createdAt).valueOf(), parseInt(item.value)]);
                        });

                        scope.values =  [ { "values": items, "key": scope.name } ];
                        console.log("from :" + scope.topic,  scope.values);
                    })
                    .error(function(response, status, headers, config) {
                        console.error( response);
                    });

                scope.xAxisTickFormatFunction = function(){
                    return function(d){
                        return d3.time.format('%H:%M:%S')(moment(d).toDate());
                    }
                };

                socket.on(scope.topic, function (message) {
                    var item = angular.fromJson(message);
                    items.push([moment().valueOf(),item.value]);

                    scope.values =  [ { "values": items, "key": scope.name } ];

                });

            }
        };
    });
