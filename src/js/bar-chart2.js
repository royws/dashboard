function constructBarGraph2(){
    let header = "2de Bar chart gemaakt met Highcharts en JSON.";
    let source = "Bron: https://www.cbs.nl/nl-nl/visualisaties/welvaart-in-coronatijd/gezondheid-in-coronatijd";

    document.getElementById("headerTwo").textContent = header;
    document.getElementById("sourceTwo").textContent = source;

    let x_axis = [];
    let x_series_one = [];
    let x_series_two = [];
    let x_series_three = [];
    let x_series_four = [];

    $.getJSON( "src/datasets/ervaren-gezondheid.json", function( data ) {
        for (let i=0,len=data.length;i<len;++i)
        {
            x_axis.push(data[i]["Jaar"]);
            x_series_one.push(parseFloat(data[i]["2017 (%)"].replace(/,/,'.')));
            x_series_two.push(parseFloat(data[i]["2018 (%)"].replace(/,/,'.')));
            x_series_three.push(parseFloat(data[i]["2019 (%)"].replace(/,/,'.')));
            if(data[i]["2020 (%)"] == 80){

                x_series_four.push(80);
                continue;
            }
            x_series_four.push(parseFloat(data[i]["2020 (%)"].replace(/,/,'.')));
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
        Highcharts.chart('container2', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Ervaren gezondheid goed of zeer goed*',
                margin: 20
            },
            xAxis: {
                categories: x_axis
            },
            yAxis: {
                min: 50,
                title: {
                    text: '%',
                    align: 'high',
                    rotation: 0,
                    reserveSpace: false,
                    y: -12,
                    x: 12,
                    style:{
                        width:200
                    }
                },
                tickInterval: 10
            },
            data: {
                decimalPoint: ','
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                //shared: true,
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
                name: '2017',
                data: x_series_one,
                color: '#00A1CD'
            }, {
                name: '2018',
                data: x_series_two,
                color: '#0058B8'
            }, {
                name: '2019',
                data: x_series_three,
                color: '#AFCB05'
            }, {
                name: '2020',
                data: x_series_four,
                color: '#53A31D'
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
