'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('MainCtrl', function ($scope, $location) {

        $scope.tempGaugeValue = 0;
        $scope.humidityGaugeValue = 0;
        $scope.smokeGaugeValue = 0;

        var tempItems = [{value: 0, timestamp: Date.now()} ];
        $scope.tempChart = { data: tempItems, max: 3000 };

        var humidityItems = [{value: 0, timestamp: Date.now()} ];
        $scope.humidityChart = { data: humidityItems, max: 3000 };

        var smokeItems = [{value: 0, timestamp: Date.now()} ];
        $scope.smokeChart = { data: smokeItems, max: 3000 };

        socket.on('temperature', function (temp) {

            var item = angular.fromJson(temp);
            item.timestamp = Date.now();

            tempItems.push(item);
            if (tempItems.length > 3000)  tempItems.shift();

            $scope.tempChart = { data: tempItems, max: 3000 };
            $scope.tempGaugeValue = item.value;

            console.log(item);
            $scope.$apply();
        });

        socket.on('humidity', function (hum) {

            var item = angular.fromJson(hum);
            item.timestamp = Date.now();

            humidityItems.push(item);
            if (humidityItems.length > 3000)  humidityItems.shift();

            $scope.humidityChart = { data: humidityItems, max: 3000 };
            $scope.humidityGaugeValue = item.value;

            console.log(item);
            $scope.$apply();
        });

        socket.on('smoke', function (smoke) {

            var item = angular.fromJson(smoke);
            item.timestamp = Date.now();

            smokeItems.push(item);
            if (smokeItems.length > 3000)  smokeItems.shift();

            $scope.smokeChart = { data: smokeItems, max: 3000 };
            $scope.smokeGaugeValue = item.value;

            console.log(item);
            $scope.$apply();
        });

    });
