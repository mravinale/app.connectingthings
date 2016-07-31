/**
 * Modified copy of https://github.com/lithiumtech/angular_and_d3/blob/master/step5/custom/gauges.js
 */

'use strict';
angular.module('app')
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
          var height = $(element).parent().parent().parent().height();
          var width = $(element).parent().parent().parent().width();

          if (scope.gauge) {
            config.size = height < width? height - 60 : width - 60;
            $( element ).children().remove();
            scope.gauge = new Gauge(element[0], config);
            scope.gauge.render();
            scope.gauge.redraw(scope.value);
          }
        });

        scope.$watch(
          function () { return $(element).parent().parent().parent().height(); },
          function (newValue, oldValue) {
            if (newValue !== oldValue) {

              var height = $(element).parent().parent().parent().height();
              var width = $(element).parent().parent().parent().width();

              config.size = height < width? height - 60 : width - 60;
              $( element ).children().remove();
              scope.gauge = new Gauge(element[0], config);
              scope.gauge.render();
              scope.gauge.redraw(scope.value);
            }
          }
        );

        scope.$watch(
          function () { return $(element).parent().parent().parent().width(); },
          function (newValue, oldValue) {
            if (newValue !== oldValue) {

              var height = $(element).parent().parent().parent().height();
              var width = $(element).parent().parent().parent().width();

              config.size = height < width? height - 60 : width - 60;
              $( element ).children().remove();
              scope.gauge = new Gauge(element[0], config);
              scope.gauge.render();
              scope.gauge.redraw(scope.value);
            }
          }
        );

      }
    };
  });
