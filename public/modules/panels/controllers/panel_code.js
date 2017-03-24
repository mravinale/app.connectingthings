
'use strict';

angular.module('app')
    .controller('PanelCodeCtrl', function ($scope, $modalInstance, host, topic, value) {

        $scope.host = host;
        $scope.topic = topic;
        $scope.value = value;
        $scope.tab = 'cURL';

        $scope.setTab = function(tabName){

            $scope.tab = tabName;

        };


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });
