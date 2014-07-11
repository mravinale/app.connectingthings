'use strict';

angular.module('meanp')
    .controller('DashboardListCtrl', function ($scope, dashboardService, ngTableParams) {

        $scope.errors = {};

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
                    dashboardService.getAll(params)
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
        }

        $scope.delete =  function(dashboard){

            dashboardService.remove(dashboard._id)
                .success(function (response, status, headers, config) {
                    $scope.tableParams.reload();
                })
                .error(function(response, status, headers, config) {
                    angular.forEach(response.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        $scope.errors[field] = error.type;
                    });
                });
        }


        $scope.initDataTable();

    });
