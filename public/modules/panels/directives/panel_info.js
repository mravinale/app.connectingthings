/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('meanp')
    .directive('panelInfo', function (socket) {
        return {
            scope:{
                name:"@",
                tag:"@",
                label:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                    '</div>'+
                    '<div class="panel-body" style="height: 233px ;overflow-y: auto;">'+
                        '<div class="list-group">'+
                            '<a href="#" class="list-group-item" ng-repeat="item in values.data">'+
                                '<i class="fa fa-envelope fa-fw"></i> {{item.value}}{{label}}'+
                                '<span class="pull-right text-muted small">'+
                                    '<em>{{item.timestamp  | date:"medium"}}</em>'+
                                '</span>'+
                            '</a>'+
                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                var items = [{value: 0, timestamp: Date.now()} ];
                scope.values = { data: items, max: 3000 };

                socket.on(scope.tag, function (value) {

                    var item = angular.fromJson(value);
                    item.timestamp = Date.now();

                    items.push(item);
                    if (items.length > 3000)  items.shift();

                    scope.values = { data: items, max: 3000 };

                });

            }
        };
    });