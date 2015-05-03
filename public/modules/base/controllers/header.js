'use strict';

angular.module('app').controller('HeaderCtrl', function ($scope,  $modal, $sessionStorage) {

    $scope.settings = function() {

        var modalInstance = $modal.open({
            templateUrl: '/modules/users/views/user_edit.html',
            controller: 'UserEditCtrl',
            size: 'lg',
            resolve: {
                userId: function () {
                    return $sessionStorage.currentUser._id;
                }
            }
        });
    };

});
