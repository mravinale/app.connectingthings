'use strict';

/* Services */
angular.module('meanp').service('panelService', function ($http) {

    this.getPanels = function(){
        return $http.get('/panels/');
    };

    this.create = function (panel) {
        return $http.post('/panels/', panel);
    };

    this.remove = function (panelId) {
        return $http.delete('/panels/'+panelId);
    };

    this.update = function (panelId, panel) {
        return $http.put('/panels/'+panelId, panel);
    };
});