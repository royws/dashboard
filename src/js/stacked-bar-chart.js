function constructStackedBarGraph(){
    var header = "Stacked Bar chart gemaakt met Highcharts en JSON.";
    var source = "Bron: https://www.cbs.nl/nl-nl/visualisaties/welvaart-in-coronatijd/gezondheid-in-coronatijd";

    document.getElementById("headerOne").textContent = header;
    document.getElementById("sourceOne").textContent = source;

    var x_axis = [], x_series_one = [], x_series_two = [], x_series_three = [], x_series_four = [], x_series_five = [], x_series_six = [], x_series_seven = [];

    $.getJSON( "src/datasets/doodsoorzaken.json", function( data ) {
        for (var i=0,len=data.length;i<len;++i)
        {
            x_axis.push(data[i]["Maand"]);
            x_series_one.push(parseInt(data[i]["Nieuwvormingen (w.o. kanker) (overledenen)"]));
            x_series_two.push(parseInt(data[i]["Hart- en vaatziekten (overledenen)"]));
            x_series_three.push(parseInt(data[i]["Psychische stoornissen of ziekte van zenuwstelsel (overledenen)"]));
            x_series_four.push(parseInt(data[i]["Ziekten van ademhalingsorganen (overledenen)"]));
            x_series_five.push(parseInt(data[i]["Niet-natuurlijke dood (overledenen)"]));
            x_series_six.push(parseInt(data[i]["Overige doodsoorzaken (overledenen)"]));
            x_series_seven.push(parseInt(data[i]["Vastgestelde en vermoedelijke COVID-19 (overledenen)"]));
        }
        plotChart();
    }).fail(function(){
        console.log("An error has occurred.");
    });
    function plotChart() {
        Highcharts.setOptions({
            lang: {
                numericSymbols: null //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
            }
        });
        Highcharts.chart('container', {
            chart: {
                type: 'bar',
                height: 480
            },
            title: {
                text: 'Doodsoorzaken, 2020'
            },
            xAxis: {
                categories: x_axis
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'overledenen',
                    align: 'high'
                },
                tickInterval: 5000
            },
            tooltip: {
                pointFormat: '<tr><td style="padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y} overledenen</b></td></tr>',
                followPointer: true,
                useHTML: true
            },
            legend: {
                reversed: true,
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'bottom',
                itemWidth: 360
            },
            plotOptions: {
                column: {
                },
                series: {
                    stacking: 'normal',
                    pointWidth: 20,
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }
            },
            series: [{
                name: 'Vastgestelde en vermoedelijke COVID-19',
                data: x_series_seven,
                color: '#FFCC00'
            },{
                name: 'Overige doodsoorzaken',
                data: x_series_six,
                color: '#AF0E80'
            },{
                name: 'Niet-natuurlijke dood',
                data: x_series_five,
                color: '#F39200'
            },{
                name: 'Ziekten van ademhalingsorganen',
                data: x_series_four,
                color: '#53A31D'
            },{
                name: 'Psychische stoornissen of ziekte van zenuwstelsel',
                data: x_series_three,
                color: '#AFCB05'
            },{
                name: 'Hart- en vaatziekten',
                data: x_series_two,
                color: '#0058B8'
            },{
                name: 'Nieuwvormingen (w.o. kanker)',
                data: x_series_one,
                color: '#00A1CD'
            }],
            exporting: {
                csv: {
                    columnHeaderFormatter: function(item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return 'Maand'
                        } else {
                            return item.name;
                        }
                    }
                },
                buttons: {
                    contextButton: {
                        menuItems: [
                            "viewFullscreen",
                            "printChart",
                            "separator",
                            "downloadPNG",
                            "downloadJPEG",
                            "downloadPDF",
                            "downloadSVG",
                            "separator",
                            "downloadCSV",
                            "downloadXLS",
                            //"viewData",
                            "openInCloud"]
                    }
                }
            }
        });
    }
}
