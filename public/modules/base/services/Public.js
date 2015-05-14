'use strict';

/* Services */
angular.module('app').service('publicService', function ($http) {

    this.getAllDashboards = function(){
        return $http.get('/public/dashboards/user/iL4bJVGT820');
    };

});