'use strict';
angular.module('app').controller('LoginCtrl', function ($scope, $rootScope,sessionService,$localStorage, $location,$modal, $log) {
    $scope.errors =  {};
    $scope.submitted = false;
    $rootScope.showHeader = true;

    $scope.init = function(form) { };

    $scope.login = function(form) {
        $scope.submitted = true;
        if(form.email.$error.required) return;

        sessionService.login('password',$scope.user)
            .success(function (response, status, headers, config) {
                $localStorage.currentUser = response;
                $rootScope.currentUser =  $localStorage.currentUser;
                $location.path('/');
            debugger
                if($rootScope.currentUser.showTutorial) {
                  showTutorial();
                }
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
                $scope.errors.other = response.message;
            });
    };

    var showTutorial = function (deviceId) {

      var modalInstance = $modal.open({
        templateUrl: '/modules/base/views/modals/tutorial.html',
        controller: 'tutorialCtrl',
        size: 'lg'
      });

      modalInstance.result.then(function () {
        $log.info('editDevice ok at: ' + new Date());
      }, function () {
        $log.info('editDevice dismissed at: ' + new Date());
      });
    };

    $scope.init();
});