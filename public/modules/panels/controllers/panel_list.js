'use strict';

angular.module('meanp')
    .controller('PanelListCtrl', function ($scope, panelService, ngTableParams,$location) {

        $scope.errors = {};

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 5,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {

                panelService.getAll(params)
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

    });
