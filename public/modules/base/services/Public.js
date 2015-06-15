'use strict';

/* Services */
angular.module('app').service('publicService', function ($http) {

    this.getAllDashboards = function(id){
        return $http.get('/public/dashboards/user/'+id);
    };

    this.getAllUsers = function(){
        return $http.get('/auth/session/users/items');
    };


});