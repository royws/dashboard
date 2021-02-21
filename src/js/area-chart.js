function constructAreaGraph(){
    var header = "Area chart gemaakt met Highcharts en JSON.";
    var source = "Bron: https://www.cbs.nl/nl-nl/visualisaties/welvaart-in-coronatijd/gezondheid-in-coronatijd";

    document.getElementById("headerOne").textContent = header;
    document.getElementById("sourceOne").textContent = source;

    var x_series_overleden = [];
    var x_series_verwacht = [];
    var x_series_interval = [];

    $.getJSON( "src/datasets/overledenen-per-week.json", function( data ) {
        for (var i=0,len=data.length;i<len;++i)
        {
            x_series_overleden.push(data[i]["Overleden"]);
            x_series_verwacht.push(data[i]["Verwacht aantal overledenen"]);

            var splitInterval = data[i]["Verwacht aantal overledenen (95%-interval)"].split("–");
            var interval = [parseInt(splitInterval[0]),parseInt(splitInterval[1])];
            x_series_interval.push(interval);
        }
        plotChart();
    }).fail(function(){
        console.log("An error has occurred.");
    });

    function plotChart(){
        Highcharts.setOptions({
            lang: {
                numericSymbols: null //otherwise by default ['k', 'M', 'G', 'T', 'P', 'E']
            }
        });
        Highcharts.chart('container', {
            chart: {
                animation: false,

                events: {
                    load: function() {
                        this.renderer.globalAnimation = false;
                    }
                }
            },
            title: {
                text: 'Overledenen per week in 2020'
            },
            yAxis: {
                min: 0,
                title: {
                    text: null
                },
                tickInterval: 2000
            },
            tooltip: {
                shared: true
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'bottom'
            },
            series: [
                {
                    name: 'Overleden',
                    data: x_series_overleden,
                    zIndex: 1,
                    color: '#0058B8',
                    marker: {
                        fillColor: '0058B8',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[0]
                    }
                },
                {
                    name: 'Verwacht aantal overledenen',
                    data: x_series_verwacht,
                    zIndex: 1,
                    color: '#00A1CD',
                    marker: {
                        fillColor: '00A1CD',
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[0]
                    }
                },
                {
                    name: 'Verwacht aantal overledenen (95%-interval)',
                    data: x_series_interval,
                    type: 'arearange',
                    lineWidth: 0,
                    color: Highcharts.getOptions().colors[0],
                    fillOpacity: 0.3,
                    zIndex: 0,
                    marker: {
                        enabled: false
                    }
                }
            ],
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        xAxis: {
                            labels: {
                                rotation: 0,
                                useHTML: true,
                                formatter() {
                                    let label = this.value;
                                    let style = `white-space: pre-wrap`; // YOUR OWN STYLE
                                    return `<div style="${style}" title="${label}">${label}</div>`;
                                }
                            }
                        },
                        legend: {
                            layout: 'horizontal',
                            align: 'left',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
        });
    }
}
