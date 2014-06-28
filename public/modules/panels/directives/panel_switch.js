/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('meanp')
    .directive('panelSwitch', function (socket, panelService) {
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
                    '<div class="panel-body text-center" style="margin-bottom: 65px;margin-top: 30px">'+
                        '<span class="toggle">'+
                            '<input checked type="checkbox" ng-model="toggleButton">'+
                                '<label data-off="&#10006;" data-on="&#10004;"></label>'+
                                '<div ng-class="'+"{'led-green' : toggleButton, 'led-off' : !toggleButton }"+'"  style="margin-top: 120px;"></div>'+
                        '</span>'+
                    ' </div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                scope.$watch('toggleButton', function(toggle) {
debugger;
                    var infoToSend = {tag:scope.tag, message: {command: null}}

                    if(toggle === true){
                        infoToSend.message.command = "ON"
                    }
                    else{
                        infoToSend.message.command = "OFF"
                    }

                    panelService.command(infoToSend)
                        .success(function (response, status, headers, config) {
                           console.log(response);
                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });

                });

                socket.on(scope.tag, function (message) {

                    console.log(scope.tag);

                });

            }
        };
    });
