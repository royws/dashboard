$(function () {
    'use strict'

    feather.replace();
    $(document).ready(function(){
        $("#stackedbar-chart").trigger("click");
    });

    $("#line-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'block';
        constructLineGraph();
        constructLineGraph2();
    });
    $("#area-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'none';
        constructAreaGraph();
    });
    $("#bar-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'block';
        constructBarGraph();
        constructBarGraph2();
    });
    $("#stackedbar-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'none';
        constructStackedBarGraph();
    });
    function setActive(element){
      if(($('#container').highcharts()) !== undefined){
          $("#container").highcharts().destroy();
      }
      if(($('#container2').highcharts()) !== undefined){
          $("#container2").highcharts().destroy();
      }
      $('.sidebar .active').removeClass('active');
      $(element).addClass('active');
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      if (width <= 767.98){
          $('#sidebarMenu').collapse('hide');
      }
    }
});
