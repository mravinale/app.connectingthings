'use strict';

angular.module('app')
    .controller('UserListCtrl', function ($scope, userService, ngTableParams, $modal, $log, psResponsive, $window, SweetAlert) {

        $scope.errors = {};
        $scope.filters = {  searchFilter: '' };

        angular.element($window).on('resize', function () {
            $scope.tableParams.emailFlag = psResponsive('> small');
        });

        $scope.initDataTable =  function(){
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10,          // count per page
                sorting: {
                    name: 'asc'     // initial sorting
                },
                filter: $scope.filters
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
            $scope.tableParams.emailFlag = psResponsive('> small');
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

          SweetAlert.swal({
              title: "Are you sure?",
              text: "Your will not be able to recover this user!",
              type: "warning",
              showCancelButton: true,
              confirmButtonColor: "#DD6B55",confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, cancel please!"
              },
            function(isConfirm){
              if (isConfirm) {

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
            });


        }


        $scope.initDataTable();

    });
