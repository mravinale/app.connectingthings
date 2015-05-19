'use strict';

angular.module('app').controller('HeaderCtrl', function ($scope,  $rootScope, $modal, $localStorage, sessionService, $location, $state) {

    $scope.settings = function() {

        var modalInstance = $modal.open({
            templateUrl: '/modules/users/views/user_edit.html',
            controller: 'UserEditCtrl',
            size: 'lg',
            resolve: {
                userId: function () {
                    return $localStorage.currentUser._id;
                }
            }
        });
    };

    $scope.logout = function() {

        sessionService.remove()
            .success(function (response, status) {
                console.log("Ok:",response);
            })
            .error(function(response, status) {
                console.log("Error:",response);
            })
            .finally(function() {

                $rootScope.currentUser = undefined;
                $localStorage.$reset();
                $state.transitionTo('access.signin');

            });

    };

});
