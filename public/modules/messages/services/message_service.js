'use strict';

angular.module('app').service('messageService', function ($http) {

    this.getAll = function(params) {
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.sorting(),
            search: params.filter().searchFilter
        }

        return $http.get('/messages', { params : paramsToSend });
    };

    this.getAllMessages = function(){
        return $http.get('/messages/items');
    };

    this.getById = function(panelId){
        return $http.get('/messages/'+panelId);
    };

    this.remove = function (messageId) {
        return $http.delete('/messages/'+messageId);
    };

});