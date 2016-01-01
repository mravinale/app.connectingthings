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
                key:"@",
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
                scope.values =[ { "values": [],"key": scope.name }];
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

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name } ];
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

                        //if(items.length > 10){
                        //  items = _.rest(items);
                        //}

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name } ];
                });

            }
        };
    });
