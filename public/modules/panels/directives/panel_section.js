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
                '<div class="row" >'+
                    '<div class="col-lg-12">'+
                        '<h3 class="row-header" style="cursor:move" >{{name }}'+
                            '<span class="section_options" style="display: none;margin-left: 20px">'+
                                '<div class="btn-group">'+
                                    '<li type="button" class="dropdown hidden-sm" style="list-style:none;">'+
                                        '<a href class="dropdown-toggle ng-binding" data-toggle="dropdown" aria-haspopup="true" aria-haspopup="true" aria-expanded="false"> ' +
                                            '<i class="fa fa-cog fa-fw"></i>'+
                                        '</a>'+
                                        '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                            '<li>' +
                                                '<a href ng-click="editSection()" >Edit Section</a>' +
                                            '</li>'+
                                        '</ul>'+
                                    '</li>'+
                                '</div>'+
                            '</span>'+
                        '</h3>'+
                    '</div>'+
                '</div>',
            link: function postLink(scope, element, attrs) {

                scope.editSection = function(){
                    var modalInstance = $modal.open({
                        templateUrl: '../modules/sections/views/section_edit.html',
                        controller: 'SectionEditCtrl',
                        size: 'lg',
                        resolve: {
                            sectionId: function () {
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

                $(element).hover(
                    function() {
                        $( ".section_options" ).css("display","");
                    }, function() {
                        $( ".section_options" ).css("display","none");;
                    }
                );


            }
        };
});
