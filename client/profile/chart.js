Template.chart.helpers({
  //wordsPerDay: () => aggregatedWords.find({}, {sort: {_id: -1}}),
  notEmpty: () => {
    var chartData = aggregatedWords.find({}, {sort: {_id: 1}}).fetch();
    if (chartData.length){
      return true;
    } else {
      return false;
    }
  }
});

Template.chart.rendered = function() {
  this.autorun(() => {
    var chartData = aggregatedWords.find({}, {sort: {_id: 1}}).fetch();
    //var negativebase = Meteor.user().profile.dailygoal;
    var negativebase = 750;
    if(chartData.length) {
      var chart = AmCharts.makeChart("chartdiv", {
          "theme": "light",
          "type": "serial",
          "creditsPosition": "bottom-left",
          "marginRight": 0,
          "marginLeft": 5,
          "marginTop": 0,
          "fontFamily": "Roboto",
          "dataProvider": chartData,
          "dataDateFormat": "YYYY-MM-DD",
          "valueAxes": [{
              "inside":true,
              "axisAlpha": 0,
              "stackType": "regular"
          }],
          "graphs": [{
              "id":"g1",
              "connect": false,
              "balloonText": "<div style='margin:5px; font-size:19px;'><span style='font-size:13px;'>[[category]]</span><br>[[value]] words</div>",
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletBorderColor": "#FFFFFF",
              "hideBulletsCount": 50,
              "lineThickness": 2,
               "negativeBase": negativebase,
              "lineColor": "#4B489B",
              "negativeLineColor": "#d6dae9",
              "valueField": "total"
          }],
          "chartScrollbar": {
            "enabled": true,
            "backgroundAlpha": 0.92,
            "backgroundColor": "#F4F4F4",
            // "color": "#E72121",
            "dragIconHeight": 25,
            "dragIconWidth": 25,
            // "graphFillColor": "#95DC2B",
            "graphLineAlpha": 0.59,
            "minimum": -4,
            "offset": 32,
            "oppositeAxis": false,
            "scrollbarHeight": 10,
            "scrollDuration": 3,
            // "selectedBackgroundColor": "#6E8EF4"
          },
          "chartCursor": {},
          "categoryField": "_id",
          "categoryAxis": {
              "parseDates": true,
              "axisAlpha": 0,
              "minPeriod": "DD",
              "minHorizontalGap": 55
          }
        });

        chart.addListener("rendered", zoomChart);

        zoomChart();

        function zoomChart() {
            if (chart) {
                if (chart.zoomToIndexes) {
                    chart.zoomToIndexes(chart.dataProvider.length - 30, chart.dataProvider.length);
                }
            }
        }
      }
  });
};
