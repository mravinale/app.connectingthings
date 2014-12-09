'use strict';

angular.module('app')
    .controller('UserListCtrl', function ($scope, userService, ngTableParams, $modal, $log) {

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
                    userService.getAll(params)
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
        };

        $scope.newUser = function () {
            var modalInstance = $modal.open({
                templateUrl: 'user_add',
                controller: 'UserAddCtrl',
                size: 'lg'
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('new user dismissed at: ' + new Date());
            });
        };

        $scope.editUser = function (userId) {

            var modalInstance = $modal.open({
                templateUrl: 'user_edit',
                controller: 'UserEditCtrl',
                size: 'lg',
                resolve: {
                    userId: function () {
                        return userId;
                    }
                }
            });

            modalInstance.result.then(function () {
                $scope.tableParams.reload();
            }, function () {
                $log.info('edit user dismissed at: ' + new Date());
            });
        };

        $scope.delete =  function(device){

            userService.remove(device._id)
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
