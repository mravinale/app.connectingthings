/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
//http://www.foscam.es/descarga/ipcam_cgi_sdk.pdf
'use strict';
angular.module('app')
    .directive('panelCamera', function (socket, $http, $interval, $modal, $log, $rootScope, SweetAlert, panelService) {
        return {
            scope:{
                name:"@",
                login:"@",
                password:"@",
                url:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                ' <div class="panel panel-default" ng-mouseover="panelCogStyle=dark" ng-mouseleave="panelCogStyle=grey">' +
                    '<div class="panel-heading">'+
                        '<i ></i> {{name}}'+
                        '<div class="pull-right" ng-if="areOptionsEnabled">'+
                            '<div class="btn-group">'+
                                '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                    '<a href class="dropdown-toggle ng-binding" data-toggle="dropdown" ng-style="panelCogStyle" aria-haspopup="true"  aria-haspopup="true"  aria-expanded="false"> <i class="fa fa-cog fa-fw"></i> </a>'+

                                    '<ul class="dropdown-menu dropdown-menu-right animated fadeInRight">'+

                                        '<li><a href ng-click="editPanel()" >Edit Panel</a></li>'+
                                        '<li><a href ng-click="deletePanel()" >Delete Panel</a></li>'+
                                        '<li class="divider"></li>'+
                                        '<li><a href ng-click="reload()" class="glyphicon glyphicon-refresh" > Reload</a></li>'+
                                        '<li><a href ng-mousedown="moveUp()" ng-mouseup="stopUp()" class="glyphicon glyphicon-arrow-up" > Move Up</a></li>'+
                                        '<li><a href ng-mousedown="moveDown()" ng-mouseup="stopDown()" class="glyphicon glyphicon-arrow-down" > Move Down</a></li>'+
                                        '<li><a href ng-mousedown="moveLeft()" ng-mouseup="stopLeft()" class="glyphicon glyphicon-arrow-left" > Move Left</a></li>'+
                                        '<li><a href ng-mousedown="moveRight()" ng-mouseup="stopRight()" class="glyphicon glyphicon-arrow-right" > Move Right</a></li>'+
                                    '</ul>'+
                                '</li>'+
                            '</div>'+
                        '</div>'+
                     '</div>'+
                    '<div class="panel-body" style="height: 233px;text-align: center">'+
                        '<img ng-src="{{stream}}" style="max-width:100%; max-height:100%">'+
                    '</div>'+
                '</div>' ,
            link: function postLink(scope, element, attrs) {

                scope.panelCogStyle = {color:'rgba(0,0,0,0)'};
                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};

                scope.stream = '/assets/img/noSignal.png';
                var stream = scope.url+"/videostream.cgi?user="+ scope.login +"&pwd="+ scope.password + '&cb=' + new Date().getTime();

                //pooling waiting the conversion
                var interval = $interval(function(){
                  scope.reload()
                }, 2000, 5);

                scope.reload = function() {
                  var image = new Image();
                  image.onerror = function () {
                    scope.stream = '/assets/img/noSignal.png';
                  };
                  image.onload = function () {
                    if(interval) {
                      $interval.cancel(interval);
                    }
                    scope.stream = stream;
                  };
                  image.src = stream;
                };

                scope.$on('$destroy', function() {
                  if(!interval) return;
                  $interval.cancel(interval);
                });

                scope.moveUp = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=0&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopUp = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=1&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.moveDown = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=2&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopDown = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=3&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.moveLeft = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=4&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopLeft = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=5&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.moveRight = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=6&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.stopRight = function(){
                    $http.jsonp(scope.url+'/decoder_control.cgi?callback=JSON_CALLBACK&command=7&user='+ scope.login +'&pwd='+ scope.password)
                    .success(function (response, status, headers, config) {
                        console.log(response)
                    })
                    .error(function(response, status, headers, config) {
                        console.log(response)
                    });
                };

                scope.editPanel = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/panels/views/panel_edit_container.html',
                        controller: 'PanelEditContainerCtrl',
                        size: 'lg',
                        resolve: {
                            panelId: function () {
                                return scope.panel;
                            }
                        }
                    });

                    modalInstance.result.then(function () {
                        $rootScope.$broadcast('reload-myDashboard');
                    }, function () {
                        $log.info('editPanel dismissed at: ' + new Date());
                    });
                };

                scope.deletePanel = function(){
                    SweetAlert.swal({
                          title: "Are you sure?",
                          text: "Your will not be able to recover this panel!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel please!"
                      },
                      function(isConfirm) {
                          if (isConfirm) {
                              panelService.remove(scope.panel)
                                .success(function (response, status, headers, config) {
                                    $rootScope.$broadcast('reload-myDashboard');
                                }).error(function (response, status, headers, config) {
                                  $log.info('error deleting the panel');
                              });
                          }
                      });
                };

            }
        };
});
