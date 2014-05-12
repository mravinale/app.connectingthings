'use strict';

/* Services */
angular.module('meanp').service('panelService', function ($http) {

    this.getAll = function(params){
        var paramsToSend ={
            page: params.page() -1,
            count: params.count()
        }

        return $http.get('/panels', { params :paramsToSend });
    };

    this.getById = function(panelId){
        return $http.get('/panels'+panelId);
    };

    this.create = function (panel) {
        return $http.post('/panels', panel);
    };

    this.remove = function (panelId) {
        return $http.delete('/panels/'+panelId);
    };

    this.update = function (panelId, panel) {
        return $http.put('/panels/'+panelId, panel);
    };
});