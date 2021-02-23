$(function () {
    'use strict'

    feather.replace();
    $(document).ready(function(){
        $("#line-chart").trigger("click");
    });
    /* Handling for loading different charts */
    $("#line-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'block';
        document.getElementById("mapContainer").style.display = 'none';
        constructLineGraph();
        constructLineGraph2();
    });
    $("#area-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'none';
        document.getElementById("mapContainer").style.display = 'none';
        constructAreaGraph();
    });
    $("#bar-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'block';
        document.getElementById("mapContainer").style.display = 'none';
        constructBarGraph();
        constructBarGraph2();
    });
    $("#stackedbar-chart").click(function(){
        setActive($(this));
        document.getElementById("secondChartDiv").style.display = 'none';
        document.getElementById("mapContainer").style.display = 'none';
        constructStackedBarGraph();
    });
    $("#map-example").click(function(){
        setActive($(this));
        document.getElementById("mapContainer").style.display = 'block';
        document.getElementById("secondChartDiv").style.display = 'none';
        constructMap();
    });
    function setActive(element)
    {
        /* Remove open tables when switching to a different chart */
        var datatables = document.getElementsByClassName("highcharts-data-table");
        if (datatables.length > 0){
            for(var i=0; i<datatables.length; i++){
                datatables[i].remove();
            }
        }
        /* Destroy old charts before loading new one */
        if(($('#container').highcharts()) !== undefined){
            $("#container").highcharts().destroy();
        }
        if(($('#container2').highcharts()) !== undefined){
            $("#container2").highcharts().destroy();
        }
        if(($('#mapContainer').highcharts()) !== undefined){
            $("#mapContainer").highcharts().destroy();
        }
        /* New Charts visual update */
        $('.sidebar .active').removeClass('active');
        $(element).addClass('active');
        let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        if (width <= 767.98){
            $('#sidebarMenu').collapse('hide');
        }
    }
    /* Override for exporting to CSV with correct decimalPoint */
    (function(H) {
        let pick = H.pick
        H.wrap(H.Chart.prototype, 'getCSV', function(p, useLocalDecimalPoint) {
            var csv = '',
                rows = this.getDataRows(),
                csvOptions = this.options.exporting.csv,
                decimalPoint = pick(csvOptions.decimalPoint, csvOptions.itemDelimiter !== ',' && useLocalDecimalPoint ?
                    (1.1).toLocaleString()[1] :
                    '.'),
                // use ';' for direct to Excel
                itemDelimiter = pick(csvOptions.itemDelimiter, decimalPoint === ',' ? ';' : ','),
                // '\n' isn't working with the js csv data extraction
                lineDelimiter = csvOptions.lineDelimiter;
            // Transform the rows to CSV
            rows.forEach(function(row, i) {
                var val = '',
                    j = row.length +1 ;
                while (j--) {
                    val = row[j];
                    if (typeof val === 'string') {
                        val = '"' + val + '"';
                    }
                    if (typeof val === 'number') {
                        val = '"' + val + '"';
                        if (decimalPoint !== '.') {
                            val = val.toString().replace('.', decimalPoint);
                        }
                    }
                    row[j] = val;
                }
                // Add the values
                csv += row.join(itemDelimiter);
                // Add the line delimiter
                if (i < rows.length - 1) {
                    csv += lineDelimiter;
                }
            });
            return csv;
        });
    }(Highcharts));
});
