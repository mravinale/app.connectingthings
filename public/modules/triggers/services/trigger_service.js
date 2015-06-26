'use strict';

/* Services */
angular.module('app').service('triggerService', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/triggers', { params :paramsToSend });
    };

    this.getAllTriggers = function(){

        return $http.get('/triggers/items');
    };

    this.getById = function(triggerId){
        return $http.get('/triggers/'+triggerId);
    };

    this.create = function (trigger) {
        return $http.post('/triggers', trigger);
    };

    this.remove = function (triggerId) {
        return $http.delete('/triggers/'+triggerId);
    };

    this.update = function ( trigger) {
        return $http.put('/triggers/'+trigger._id, trigger);
    };

    this.command = function (command) {
        return $http.post('/triggers/command', command);
    };
});