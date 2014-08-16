/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('meanp')
    .directive('panelCamera', function (socket) {
        return {
            scope:{
                name:"@",
                topic:"@",
                label:"@",
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
                    '<div class="panel-body" style="height: 233px;text-align: center">'+
                        '<img ng-src="{{stream}}" style="max-width:100%; max-height:100%">'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {
                scope.stream = "http://mravinale.dyndns.org/videostream.cgi?user=guest&pwd=123456789";
            }
        };
});
