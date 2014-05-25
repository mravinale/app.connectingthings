'use strict';
//http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html
angular.module('meanp')
    .controller('PanelMeCtrl', function ($scope, panelService,$sessionStorage) {

        console.log("init",$sessionStorage.panels);

        panelService.getAllPanels()
            .success(function (response, status, headers, config) {
               $scope.panels = response;
                console.log(response);
            })
            .error(function(response, status, headers, config) {
                angular.forEach(response.errors, function(error, field) {
                    form[field].$setValidity('mongoose', false);
                    $scope.errors[field] = error.type;
                });
            });

        $scope.sortableConfig =  {
            stop: function(e, ui) {
                $sessionStorage.panels = $scope.panels.map(function(i){ return i._id; });
            }
        };

    });

angular.module('meanp').filter('orderPanel', function($sessionStorage) {
    return function(input) {
        var out = [];

        if($sessionStorage.panels === undefined){
            out = input
        }
        else{
            _.each($sessionStorage.panels, function(panelId){
                out.push(_.find(input, function(panel){ return panelId  == panel._id; }));
            });
        }

        return out;
    };
})
