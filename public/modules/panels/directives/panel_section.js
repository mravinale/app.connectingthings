'use strict';
angular.module('app')
    .directive('panelSection', function (socket, $http, $interval, $modal, $log, $rootScope) {
        return {
            scope:{
                name:"@",
                section:"@"
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

                scope.editPanel = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/sections/views/section_edit.html',
                        controller: 'SectionEditCtrl',
                        size: 'lg',
                        resolve: {
                            panelId: function () {
                                return scope.section;
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
