'use strict';

angular.module('app').service('userService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/users', { params : paramsToSend });
    };

    this.getAllUsers = function(){
        return $http.get('/users/items');
    };

    this.getById = function(userId){
        return $http.get('/users/'+userId);
    };

    this.create = function (user) {
        return $http.post('/users', user);
    };

    this.remove = function (userId) {
        return $http.delete('/users/'+userId);
    };

    this.update = function ( user) {
        return $http.put('/users/'+user._id, user);
    };
});