'use strict';

/* Services */
angular.module('app').service('messageService', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/messages', { params :paramsToSend });
    };

    this.getAllMessages = function(param){

        return $http.get('/messages/items', { params : { tag: param} });
    };


});