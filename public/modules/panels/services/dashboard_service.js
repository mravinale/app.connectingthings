'use strict';

/* Services */
angular.module('meanp').service('dashboardService', function ($http) {


    this.getDashboard = function(){
        return $http.get('/dashboard');
    };

    this.createDashboard = function (param) {
        return $http.post('/dashboard', {order: param});
    };

});