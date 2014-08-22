'use strict';

angular.module('meanp')
    .controller('DeviceListCtrl', function ($scope, deviceService, ngTableParams) {

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
                    deviceService.getAll(params)
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

        $scope.delete =  function(camera){

            deviceService.remove(camera._id)
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
