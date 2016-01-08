/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelLed', function (socket, panelService, messageService) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
                label:"@",
                url:"@",
                protocol:"@",
                tag:"@"
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
                    '<div ng-class="'+"{'led-blue' : toggleLed, 'led-off' : !toggleLed }"+'"  style="width:80px;height:80px"></div>'+
                '</div>'+
            '</div>'  ,
            link: function postLink(scope, element, attrs) {

              var items = [ ];
              messageService.getAllMessages(scope.topic)
                .success(function (response, status, headers, config) {
                  angular.forEach(response, function(message) {
                    var item = angular.fromJson(message);
                    if(item && item.value !== 0) {
                      items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                    }

                  });

                  scope.toggleLed =  _.sortBy(items, 'timestamp').reverse()[0] ? _.sortBy(items, 'timestamp').reverse()[0] .value  == "1" : false;
                })
                .error(function(response, status, headers, config) {
                  console.error( response);
                });

                socket.on(scope.topic, function (message) {

                  var messageValue = angular.fromJson(message).value;
                  if(messageValue !== "0" && messageValue !== "1" ) return;

                  scope.toggleLed = messageValue == "1";
                });



            }
        };
    });
