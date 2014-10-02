/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */
//C:\GitHub\external\MQTT\examples\client>node simple-both.js
//http://www.foscam.es/descarga/ipcam_cgi_sdk.pdf
'use strict';
angular.module('app')
    .directive('panelCamera', function (socket, $http) {
        return {
            scope:{
                name:"@",
                login:"@",
                password:"@",
                url:"@"
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

                                    '<ul class="dropdown-menu animated fadeInRight w">'+

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

                scope.stream = scope.url+"/videostream.cgi?user="+ scope.login +"&pwd="+ scope.password + '&cb=' + new Date().getTime();

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


            }
        };
});
