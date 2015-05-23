'use strict';

angular.module('app')
    .controller('OrganizationListCtrl', function ($scope, organizationService, ngTableParams, $modal, $log, psResponsive,$window) {

        $scope.errors = {};

        angular.element($window).on('resize', function () {
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                }
            },{
                total: 0,           // length of data
                getData: function($defer, params) {
                    organizationService.getAll(params)
                        .success(function (response, status, headers, config) {
                            params.total(response.count);
                            $defer.resolve(response.data);

                        })
                        .error(function(response, status, headers, config) {
                            angular.forEach(response.errors, function(error, field) {
                                form[field].$setValidity('mongoose', false);
                                $scope.errors[field] = error.type;
                            });
                        });
                }
              });
            $scope.tableParams.descriptionFlag = psResponsive('> small');
        };

        $scope.newOrganization = function () {
            var modalInstance = $modal.open({
                templateUrl: 'organization_add',
                controller: 'OrganizationAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('new organization dismissed at: ' + new Date());
            });
        };

        $scope.editOrganization = function (organizationId) {

            var modalInstance = $modal.open({
                templateUrl: 'organization_edit',
                controller: 'OrganizationEditCtrl',
                size: 'lg',
                resolve: {
                    organizationId: function () {
                        return organizationId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('edit organization dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

            organizationService.remove(device._id)
                .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        };


        $scope.initDataTable();

    });
