function constructLineGraph(){
    let header = "Line chart gemaakt met Highcharts en JSON.";
    let source = "Bron: https://www.cbs.nl/nl-nl/visualisaties/welvaart-in-coronatijd/samenleving";

    document.getElementById("headerOne").textContent = header;
    document.getElementById("sourceOne").textContent = source;

    let x_axis = [];
    let x_series_2019 = [];
    let x_series_2020 = [];

    $.getJSON( "src/datasets/samenleving-huwelijken.json", function( data ) {
        for (let i=0,len=data.length;i<len;++i)
        {
            x_axis.push(data[i]["Perioden"]);
            x_series_2019.push(parseFloat(data[i]["2019 (x 1 000)"].replace(/,/,'.')));
            x_series_2020.push(parseFloat(data[i]["2020* (x 1 000)"].replace(/,/,'.')));
        }
        plotChart();
    }).fail(function(){
        console.log("An error has occurred.");
    });

    function plotChart(){
        Highcharts.setOptions({
            lang: {
                decimalPoint: ','
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
                text: 'Huwelijken'
            },
            xAxis: {
                categories: x_axis
            },
            yAxis: {
                title: {
                    align: 'high',
                    offset: 0,
                    text: 'x1 000',
                    rotation: 0,
                    y: -20
                },
                tickInterval: 2.5
            },
            data: {
                decimalPoint: ','
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: false
                    },
                    states: {
                        inactive: {
                            opacity: 1
                        }
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'bottom'
            },
            series: [{
                name: '2019',
                data: x_series_2019,
                color: '#0058B8'
            }, {
                name: '2020',
                data: x_series_2020,
                color: '#00A1CD'
            }],

            tooltip: {
                shared: true
            },

            table: {
                thousandsSep: ',',
                decimalPoint: ','
            },

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
            exporting: {
                csv: {
                    itemDelimiter: ",",
                    decimalPoint:",",
                    columnHeaderFormatter: function(item, key) {
                        if (!item || item instanceof Highcharts.Axis) {
                            return 'Perioden'
                        } else {
                            if (item.name == "2019"){
                                return '2019 (x 1 000)';
                            }else if(item.name == "2020"){
                                return '2020* (x 1 000)';
                            }
                            return item.name;
                        }
                    }
                },
            },
        });
    }
}
