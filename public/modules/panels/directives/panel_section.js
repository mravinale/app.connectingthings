'use strict';
angular.module('app')
    .directive('panelSection', function (socket, $http, $interval, $modal, $log, $rootScope, SweetAlert, sectionService) {
        return {
            scope:{
                name:"@",
                section:"@"
            },
            restrict: 'E',
            replace: true,
            template:
                '<div class="row" >'+
                    '<div class="col-lg-12" ng-mouseover="panelStyle=dark" ng-mouseleave="panelStyle=grey">'+
                        '<h3 class="row-header" style="cursor:move" >{{name}}'+
                            '<span class="section_options"  style="margin-left: 20px" >'+
                                '<div class="btn-group" style="font-size: 20px" >'+
                                    '<li type="button" class="dropdown hidden-sm">'+
                                        '<a href class="dropdown-toggle ng-binding" ng-style="panelStyle" data-toggle="dropdown" aria-haspopup="true" aria-haspopup="true" aria-expanded="false"> ' +
                                            '<i class="fa fa-cog fa-fw"></i>'+
                                        '</a>'+
                                        '<ul class="dropdown-menu dropdown-menu-right animated fadeInLeft">'+
                                            '<li>' +
                                                '<a href ng-click="editSection()" >Edit Section</a>' +
                                            '</li>'+
                                            '<li><a href ng-click="deleteSection()" >Delete Section</a></li>'+
                                        '</ul>'+
                                    '</li>'+
                                '</div>'+
                            '</span>'+
                        '</h3>'+
                    '</div>'+
                '</div>',
            link: function postLink(scope, element, attrs) {

                scope.panelStyle = {color:'rgba(0,0,0,0)'};

                scope.grey= {color:'rgba(0,0,0, 0)'};
                scope.dark= {color:'rgba(0,0,0,.35)'};


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

                scope.deleteSection = function(){
                    SweetAlert.swal({
                          title: "Are you sure?",
                          text: "Your will not be able to recover this section!",
                          type: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel please!"
                      },
                      function(isConfirm) {
                          if (isConfirm) {
                              sectionService.remove(scope.section)
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
