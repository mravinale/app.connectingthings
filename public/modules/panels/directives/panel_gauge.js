/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('meanp')
    .directive('panelGauge', function (socket) {
        return {
            scope:{
                name:"@",
                tag:"@",
                label:"@",
                min:"=",
                max:"=",
                size:"=",
                initValue:"="
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default">' +
                    '<div class="panel-heading">'+
                        '<i class="fa fa-bar-chart-o fa-fw"></i> {{name}}'+
                    '</div>'+
                    '<div class="panel-body" style="height: 233px ;">'+
                        '<div class="text-center">'+
                            '<gauge min="min" max="max" size="size" value="gaugeValue" label="{{label}}" class="gauge"></gauge>'+
                        '</div>'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                scope.gaugeValue = scope.initValue? scope.initValue : 0;

                socket.on(scope.tag, function (temp) {
                    scope.gaugeValue = angular.fromJson(temp).value;
                });

            }
        };
    });
