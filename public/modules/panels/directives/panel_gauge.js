/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */

'use strict';
angular.module('meanp')
    .directive('panelGauge', function (socket) {
        return {
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
            restrict: 'E',
            replace: true,
            template:' <div class="panel panel-default">' +
            '<div class="panel-heading">'+
                ' <i class="fa fa-bar-chart-o fa-fw"></i> Temperature'+
                '</div>'+
                '<div class="panel-body" style="height: 233px ;overflow-y: auto;">'+
                '<div class="text-center">'+
                '<gauge min="0" max="60" size="190" value="gaugeValue" label="º C" class="gauge"></gauge>'+
                '</div>'+
                '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                scope.gaugeValue = 0;

                socket.on('temperature', function (temp) {

                    var item = angular.fromJson(temp);
                    scope.gaugeValue = item.value;

                    console.log(item);
                });


            }
        };
    });
