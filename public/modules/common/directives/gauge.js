/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */

'use strict';
angular.module('meanp')
  .directive('gauge', function () {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        label: '@',
        min: '=',
        max: '=',
        value: '=',
        size:'='
      },
      link: function postLink(scope, element, attrs) {
        var config = {
          size: scope.size? scope.size : 220,
          label: attrs.label,
          min: undefined !== scope.min ? scope.min : 0,
          max: undefined !== scope.max ? scope.max : 100,
          minorTicks: 5
        };

        var range = config.max - config.min;
        config.yellowZones = [
          { from: config.min + range * 0.75, to: config.min + range * 0.9 }
        ];
        config.redZones = [
          { from: config.min + range * 0.9, to: config.max }
        ];

        scope.gauge = new Gauge(element[0], config);
        scope.gauge.render();
        scope.gauge.redraw(scope.value);

        scope.$watch('value', function () {
          if (scope.gauge) {
            scope.gauge.redraw(scope.value);
          }
        });
      }
    };
  });
