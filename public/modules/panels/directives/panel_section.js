'use strict';
angular.module('app')
    .directive('panelSection', function (socket, $http, $interval, $modal, $log, $rootScope) {
        return {
            scope:{
                name:"@",
                panel:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                '<div class="row" >' +
                    '<div class="col-lg-12">' +
                        '<h3 class="row-header" style="cursor:move" >{{name}}</h3>' +
                    '</div>' +
                '</div>',
            link: function postLink(scope, element, attrs) {

                scope.$on('$destroy', function() {
                  if(!interval) return;
                  $interval.cancel(interval);
                });

                scope.editPanel = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/panels/views/panel_edit.html',
                        controller: 'PanelEditCtrl',
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
                        $log.info('editDashboard dismissed at: ' + new Date());
                    });

                };


            }
        };
});
