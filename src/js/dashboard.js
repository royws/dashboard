$(function () {
    'use strict'

    feather.replace();
    $(document).ready(function(){
        $("#map-example").trigger("click");
    });

    $("#line-chart").click(function(){
        setActive($(this));
        document.getElementById("firstChartDiv").style.display = 'block';
        document.getElementById("secondChartDiv").style.display = 'block';
        document.getElementById("mapContainer").style.display = 'none';
        constructLineGraph();
        constructLineGraph2();
    });
    $("#area-chart").click(function(){
        setActive($(this));
        document.getElementById("firstChartDiv").style.display = 'block';
        document.getElementById("secondChartDiv").style.display = 'none';
        document.getElementById("mapContainer").style.display = 'none';
        constructAreaGraph();
    });
    $("#bar-chart").click(function(){
        setActive($(this));
        document.getElementById("firstChartDiv").style.display = 'block';
        document.getElementById("secondChartDiv").style.display = 'block';
        document.getElementById("mapContainer").style.display = 'none';
        constructBarGraph();
        constructBarGraph2();
    });
    $("#stackedbar-chart").click(function(){
        setActive($(this));
        document.getElementById("firstChartDiv").style.display = 'block';
        document.getElementById("secondChartDiv").style.display = 'none';
        document.getElementById("mapContainer").style.display = 'none';
        constructStackedBarGraph();
    });
    $("#map-example").click(function(){
        setActive($(this));
        document.getElementById("mapContainer").style.display = 'block';
        document.getElementById("firstChartDiv").style.display = 'block';
        document.getElementById("secondChartDiv").style.display = 'none';
        constructMap();
    });
    function setActive(element)
    {
        var datatables = document.getElementsByClassName("highcharts-data-table");
        if (datatables.length > 0){
            for(var i=0; i<datatables.length; i++){
                datatables[i].remove();
            }
        }
        if(($('#container').highcharts()) !== undefined){
            $("#container").highcharts().destroy();
        }
        if(($('#container2').highcharts()) !== undefined){
            $("#container2").highcharts().destroy();
        }
        if(($('#mapContainer').highcharts()) !== undefined){
            $("#mapContainer").highcharts().destroy();
        }
        $('.sidebar .active').removeClass('active');
        $(element).addClass('active');
        var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width <= 767.98){
            $('#sidebarMenu').collapse('hide');
        }
    }
});
