/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelD3Chart', function (socket, messageService,$rootScope) {
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
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                '<a href class="dropdown-toggle ng-binding btn btn-default btn-xs" data-toggle="dropdown" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> Actions </a>'+
                                    '<ul class="dropdown-menu animated fadeInLeft w">'+
                                         '<li><a href ng-click="clean()" >Clean</a></li>'+
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
                                ' height="{{heightValue}}"'+
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
                scope.heightValue = "260";
                scope.values =[ { "values": [],"key": scope.name, height: 260 }];
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

                scope.clean = function(){
                    items = [];

                    if(lastValue  == "0" || lastValue  == "1") {
                      items.push([ moment().add(-1, "milliseconds").valueOf(), lastValue == "1"? "0" : "1"  ]);
                    }
                    items.push([ moment().valueOf(), "0" ]);

                    scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name } ];
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

                        scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name } ];

                });


                scope.$on("panel-height/"+scope.name.replace(/\s/g, "-"), function(event, args) {

                    scope.values =  [ { "values": _.sortBy(items, function(o) { return o[0]; }), "key": scope.name,  height: args.height } ];

                });

            }
        };
    });
