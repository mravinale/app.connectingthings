'use strict';

angular.module('app')
  .directive('headway', function () {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        $.getScript("http://cdn.headwayapp.co/widget.js");
      }
    }
  });
