function constructMap(){
    var header = "Interactieve map gemaakt met Highcharts Maps";
    var source = "Databron: https://www.cbs.nl/nl-nl/visualisaties/dashboard-bevolking/regionaal/inwoners";

    document.getElementById("headerOne").textContent = header;
    document.getElementById("sourceOne").textContent = source;

    var data = [
        ['nl-3560-gm0627', 29291],//Waddinxveen
        ['nl-3560-gm1672', 18577],//Rijnwoude
        ['nl-3560-gm1924', 50049],//Goeree-Overflakkee
        ['nl-3560-gm0537', 65753],//Katwijk
        ['nl-3560-gm1525', 37440],//Teylingen
        ['nl-3560-gm0576', 16605],//Noordwijkerhout
        ['nl-3560-gm0617', 8793],//Strijen
        ['nl-3560-gm1901', 34872],//Bodegraven-Reeuwijk
        ['nl-3560-gm0623', 9694],//Vlist
        ['nl-3560-gm0545', 21030],//Leerdam
        ['nl-3560-gm0620', 19967],//Vianen
        ['nl-3560-gm1621', 62384],//Lansingerland
        ['nl-3560-gm0637', 125285],//Zoetermeer
        ['nl-3560-gm0499', 15195],//Boskoop
        ['nl-3560-gm0512', 37022],//Gorinchem
        ['nl-3560-gm0523', 18295],//Hardinxveld-Giessendam
        ['nl-3560-gm0531', 31202],//Hendrik-Ido-Ambacht
        ['nl-3560-gm0482', 20165],//Alblasserdam
        ['nl-3560-gm0546', 125099],//Leiden
        ['nl-3560-gm0534', 22209],//Hillegom
        ['nl-3560-gm0553', 22955],//Lisse
        ['nl-3560-gm0585', 29098],//Binnenmaas
        ['nl-3560-gm0638', 8605],//Zoeterwoude
        ['nl-3560-gm1916', 76534],//Leidschendam-Voorburg
        ['nl-3560-gm0568', 12368],//Bernisse
        ['nl-3560-gm0612', 72561],//Spijkenisse
        ['nl-3560-gm0505', 119284],//Dordrecht
        ['nl-3560-gm0590', 32136],//Papendrecht
        ['nl-3560-gm0503', 103595],//Delft
        ['nl-3560-gm0599', 651157],//Rotterdam
        ['nl-3560-gm1926', 55308],//Pijnacker-Nootdorp
        ['nl-3560-gm1892', 43885],//Zuidplas
        ['nl-3560-gm0644', 8211],//Ouderkerk
        ['nl-3560-gm0491', 9970],//Bergambacht
        ['nl-3560-gm0608', 11903],//Schoonhoven
        ['nl-3560-gm0610', 25220],//Sliedrecht
        ['nl-3560-gm0530', 40142],//Hellevoetsluis
        ['nl-3560-gm0614', 14731],//Westvoorne
        ['nl-3560-gm0584', 24301],//Oud-Beijerland
        ['nl-3560-gm0611', 12826],//Cromstrijen
        ['nl-3560-gm0588', 11097],//Korendijk
        ['nl-3560-gm0501', 17271],//Brielle
        ['nl-3560-gm0613', 25590],//Albrandswaard
        ['nl-3560-gm0622', 73397],//Vlaardingen
        ['nl-3560-gm0556', 33213],//Maassluis
        ['nl-3560-gm0629', 26305],//Wassenaar
        ['nl-3560-gm0547', 27056],//Leiderdorp
        ['nl-3560-gm0642', 44737],//Zwijndrecht
        ['nl-3560-gm0489', 48714],//Barendrecht
        ['nl-3560-gm1927', 29295],//Molenwaard
        ['nl-3560-gm0597', 46189],//Ridderkerk
        ['nl-3560-gm0542', 29526],//Krimpen aan den IJssel
        ['nl-3560-gm0502', 67122],//Capelle aan den IJssel
        ['nl-3560-gm0513', 73427],//Gouda
        ['nl-3560-gm0518', 545838],//s-Gravenhage
        ['nl-3560-gm1783', 110375],//Westland
        ['nl-3560-gm1842', 19341],//Midden-Delfland
        ['nl-3560-gm0575', 43508],//Noordwijk
        ['nl-3560-gm0603', 54450],//Rijswijk
        ['nl-3560-gm0569', 28811],//Nieuwkoop
        ['nl-3560-gm1884', 27297],//Kaag en Braassem
        ['nl-3560-gm0484', 111897],//Alphen aan den Rijn
        ['nl-3560-gm0626', 25596],//Voorschoten
        ['nl-3560-gm0643', 14075],//Nederlek
        ['nl-3560-gm0689', 14551],//Giessenlanden
        ['nl-3560-gm0707', 14004],//Zederik
        ['nl-3560-gm0579', 24840],//Oegstgeest
        ['nl-3560-gm0606', 78730]//Schiedam
    ];

    // Create the chart
    Highcharts.mapChart('container', {
        chart: {
            map: 'countries/nl/nl-zh-all'
        },
        title: {
            text: 'Inwoners per gemeente'
        },
        subtitle: {
            text: 'Source map: <a href="http://code.highcharts.com/mapdata/countries/nl/nl-zh-all.js">Zuid-Holland</a>'
        },
        mapNavigation: {
            enabled: true,
            buttonOptions: {
                verticalAlign: 'bottom'
            }
        },
        colorAxis: {
            dataClassColor: 'category',
            dataClasses: [{
                from: 0,
                to: 25000,
                color: '#00A1CD'
            },
            {
                from: 25000,
                to: 50000,
                color: '#0058B8'
            }, {
                from: 50000,
                to: 100000,
                color: '#AFCB05'
            },  {
                from: 100000,
                color: '#53A31D'
            }]
        },
        legend: {
            title: {
                text: 'Aantal inwoners',
                style: {
                    color: ( // theme
                        Highcharts.defaultOptions &&
                        Highcharts.defaultOptions.legend &&
                        Highcharts.defaultOptions.legend.title &&
                        Highcharts.defaultOptions.legend.title.style &&
                        Highcharts.defaultOptions.legend.title.style.color
                    ) || 'black'
                }
            },
            align: 'right',
            floating: true,
            verticalAlign: 'bottom',
            layout: 'vertical',
            valueDecimals: 0,
            backgroundColor: ( // theme
                Highcharts.defaultOptions &&
                Highcharts.defaultOptions.legend &&
                Highcharts.defaultOptions.legend.backgroundColor
            ) || 'rgba(255, 255, 255, 0.85)',
            symbolRadius: 0,
            symbolHeight: 14
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        align: 'center',
                        floating: false
                    }
                }
            }]
        },
        series: [{
            data: data,
            name: 'Inwonersaantal',
            states: {
                hover: {
                    color: '#BADA55'
                }
            },
            dataLabels: {
                format: '{point.name}'
            }
        }]
    });
}