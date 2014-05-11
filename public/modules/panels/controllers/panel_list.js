'use strict';

angular.module('meanp')
    .controller('PanelListCtrl', function ($scope, panelService, ngTableParams) {

        $scope.errors = {};

        $scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10,          // count per page
            sorting: {
                name: 'asc'     // initial sorting
            }
        }, {
            total: 0,           // length of data
            getData: function($defer, params) {

                panelService.getAll()
                    .success(function (response, status, headers, config) {
                        params.total(response.length);
                        $defer.resolve(response);

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
