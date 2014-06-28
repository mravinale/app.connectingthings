'use strict';

/* Services */
angular.module('meanp').service('panelService', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count(),
            orderBy: params.orderBy(),
            filter: {}
        }

        return $http.get('/panels', { params :paramsToSend });
    };

    this.getAllPanels = function(){

        return $http.get('/panels/items');
    };

    this.getById = function(panelId){
        return $http.get('/panels/'+panelId);
    };

    this.create = function (panel) {
        return $http.post('/panels', panel);
    };

    this.remove = function (panelId) {
        return $http.delete('/panels/'+panelId);
    };

    this.update = function ( panel) {
        return $http.put('/panels/'+panel._id, panel);
    };

    this.command = function (command) {
        return $http.post('/panels/command', command);
    };
});