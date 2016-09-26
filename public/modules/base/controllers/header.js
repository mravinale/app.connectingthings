'use strict';

angular.module('app').controller('HeaderCtrl', function ($scope,  $rootScope, $modal, $localStorage, sessionService, $location, $state, $log) {

  $scope.settings = function() {

      //http://blog.reactandbethankful.com/angular-multi-step-form/#/inside-modal
        var modalInstance = $modal.open({
            templateUrl: '/modules/users/views/user_settings.html',
            controller: 'UserSettingsCtrl',
            size: 'lg',
            resolve: {
                userId: function () {
                    return $localStorage.currentUser._id;
                }
            }
        });
    };

    $scope.showTutorial = function () {
      var modalInstance = $modal.open({
        templateUrl: '/modules/base/views/modals/tutorial.html',
        controller: 'tutorialCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function () {
        $log.info('showTutorial ok at: ' + new Date());
      }, function () {
        $log.info('showTutorial dismissed at: ' + new Date());
      });
    };

    $scope.payment = function () {
        var modalInstance = $modal.open({
            templateUrl: '/modules/base/views/modals/payment.html',
            controller: 'paymentCtrl',
            size: 'lg',
            resolve: {
                userId: function () {
                    return $localStorage.currentUser._id;
                }

            }
        });

        modalInstance.result.then(function () {
            $log.info('editDevice ok at: ' + new Date());
        }, function () {
            $log.info('editDevice dismissed at: ' + new Date());
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
                location.reload();
                $state.transitionTo('access.signin');
            });

    };

});
