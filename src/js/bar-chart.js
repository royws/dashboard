function constructBarGraph(){
    let header = "Bar chart gemaakt met Highcharts en JSON.";
    let source = "Bron: https://www.cbs.nl/nl-nl/visualisaties/welvaart-in-coronatijd/samenleving";

    document.getElementById("headerOne").textContent = header;
    document.getElementById("sourceOne").textContent = source;

    let x_axis = [];
    let x_series_one = [];
    let x_series_two = [];
    let x_series_three = [];

    $.getJSON( "src/datasets/vertrouwen-participatie.json", function( data ) {
        for (let i=0,len=data.length;i<len;++i)
        {
            x_axis.push(data[i]["Indicator"]);
            x_series_one.push(parseFloat(data[i]["1e kwartaal 2020 (% personen van 15 jaar of ouder)"].replace(/,/,'.')));
            x_series_two.push(parseFloat(data[i]["2e kwartaal 2020 (% personen van 15 jaar of ouder)"].replace(/,/,'.')));
            x_series_three.push(parseFloat(data[i]["3e kwartaal 2020 (% personen van 15 jaar of ouder)"].replace(/,/,'.')));
        }
        plotChart();
    }).fail(function(){
        console.log("An error has occurred.");
    });
    function plotChart() {
        Highcharts.setOptions({
            lang: {
                decimalPoint: ','
            }
        });
        Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Vertrouwen en Participatie',
                margin: 20
            },
            xAxis: {
                categories: x_axis
            },
            yAxis: {
                min: 0,
                title: {
                    text: '% personen van 15 jaar of ouder',
                    align: 'high',
                    rotation: 0,
                    reserveSpace: false,
                    y: -12,
                    x: 190,
                    style:{
                        width:200
                    }
                },
                tickInterval: 20
            },
            data: {
                decimalPoint: ','
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                followPointer: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    //pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
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
                name: '1e kwartaal 2020',
                data: x_series_one,
                color: '#00A1CD'
            }, {
                name: '2e kwartaal 2020',
                data: x_series_two,
                color: '#0058B8'
            }, {
                name: '3e kwartaal 2020',
                data: x_series_three,
                color: '#AFCB05'
            }],
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
                            return 'Indicator'
                        } else {
                            return item.name;
                        }
                    }
                },
            },
        });
    }
}
