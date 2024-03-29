'use strict';

angular.module('app')
  .directive('lineChart', function () {
    return {
      template: '<div></div>',
      scope: {
        chart: '=',
        ymin:'=',
        ymax:'='
      },
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element) {

        var lineChart = new google.visualization.LineChart(element[0]);

        function draw(chart) {
          var data = chart.data;

          var table = new google.visualization.DataTable();
          table.addColumn('datetime');
          table.addColumn('number');
          table.addRows(data.length);

          var view = new google.visualization.DataView(table);

          for (var i = 0; i < data.length; i++) {
            var item = data[i];
            table.setCell(i, 0, new Date(item.timestamp));
            var value = parseFloat(item.value);
            table.setCell(i, 1, value);
          }

          var last = data[data.length - 1];
          var max = new Date(last.timestamp);
          var min = new Date(data[0].timestamp) //new Date(last.timestamp - chart.max * 1000);

          var chartOptions = {
            legend: 'none',
            vAxis: { minValue: scope.ymin ? scope.ymin : 0, maxValue: scope.ymax ? scope.ymax :100 },
            hAxis: { viewWindow: { min: min, max: max }}
          };

          lineChart.draw(view, chartOptions);
        }

        scope.$watch('chart', function (chart) {
          if (chart && chart.data && chart.max) {
            draw(chart);
         //   $(".line-chart").children().css("height", "");
         //   $(".line-chart div").css("position", "relative");
          }
        });
      }
    };
  });
