'use strict';

angular.module('app')
  .directive('headway', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $.getScript("https://cdn.headwayapp.co/widget.js");
      }
    }
  });
