Highcharts.theme = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        backgroundColor: '#032538',
        width: null,
        height: null
    },
    title: {
        style: {
            color: '#fff',
            font: 'bold 16px "Roboto", sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#fff',
            font: 'bold 12px "Roboto", sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '12px "Roboto", sans-serif',
            color: '#fff'
        },
        itemHoverStyle:{
            color: 'gray'
        },
        align: 'center',
        verticalAlign: 'bottom',  
    },
    xAxis: {
        gridLineColor: '#0e5a7a',
        labels: {
            style: {
                color: '#FFF'
            }
        },
        lineColor: '#0e5a7a',
        minorGridLineColor: '#0e5a7a',
        tickColor: '#0e5a7a',
        title: {
            style: {
                color: '#FFF'

            }
        }
    },
    yAxis: {
        gridLineColor: '#0e5a7a',
        labels: {
            style: {
                color: '#FFF'
            }
        },
        lineColor: '#0e5a7a',
        minorGridLineColor: '#0e5a7a',
        tickColor: '#0e5a7a',
        tickWidth: 1,
        title: {
            style: {
                color: '#FFF'
            }
        }
    },
    credits: {
        style: {
            color: '#032538'
        }
    },
    plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },
};

Highcharts.setOptions(Highcharts.theme);