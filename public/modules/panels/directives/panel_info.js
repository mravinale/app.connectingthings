/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
'use strict';
angular.module('app')
    .directive('panelInfo', function (socket, messageService) {
        return {
            scope:{
                name:"@",
                topic:"@",
                key:"@",
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
                    '<div class="panel-body">'+
                        '<div class="list-group"  style="overflow-y: auto;">'+
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

                var items = [ ];

                messageService.getAllMessages(scope.topic)
                  .success(function (response, status, headers, config) {
                    angular.forEach(response, function(message) {
                      var item = angular.fromJson(message);
                      if(item && item.value !== 0) {
                        items.push({ timestamp: moment(item.createdAt).toDate(), value: item.value });
                      }

                    });

                    scope.values = { data: _.sortBy(items, 'timestamp'), max: 3000 };
                    $(element.children()[1]).children().height( $(element).height() - 80 );
                  })
                  .error(function(response, status, headers, config) {
                    console.error( response);
                  });

                scope.$watch(
                  function () { return $(element).height(); },
                  function (newValue, oldValue) {
                    if (newValue !== oldValue) {
                      $(element.children()[1]).children().height( newValue - 80 )
                    }
                  }
                );


               socket.on(scope.topic, function (message) {

                    var item = angular.fromJson(message);
                    item.timestamp = Date.now();

                    items.push(item);
                    if (items.length > 3000)  items.shift();

                    scope.values = { data: items, max: 3000 };

                });

            }
        };
    });
