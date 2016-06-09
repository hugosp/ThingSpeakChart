$(document).ready(function() {
    console.log('%c Hewgo´s ThingSpeak-Fluff ... Get all ur data in one Chart! ', 'background: #222; color: #bada55');
    
    USERNAME    = 'THINGSPEAK USERNAME HERE';	
    DAYS        = 1;

    drawGraph();
    getChannels(USERNAME,DAYS);


    $('.timeBtn').click(function() {
        var chart = $('#chartContainer').highcharts();
        var seriesLength = chart.series.length;
        for(var i = seriesLength -1; i > -1; i--) {
            chart.series[i].remove();
        }
        $('.tempContainer').empty();
        getChannels(USERNAME,this.value);
    });
    
}); 

function getChannels (username,days) {
    var ids = [];
    $.getJSON('https://api.thingspeak.com/channels/public.json?username='+username, function(data) {
        $.each(data.channels, function(index, val) {
            ids.push(val.id);
            console.log(index +': ' + val.id + ' : ' + val.name);
        });
    }).done(function(){
        $.each(ids, function(index, val){
            getSeriesData(index,val,days);
        });
    });
}

function getSeriesData(index,channel,days) {
    var dataFluff = [];

    $.ajax({
        url: "https://thingspeak.com/channels/" + channel + "/feed.json",
        jsonp: "callback",
        dataType: "jsonp",
        data: {
            days: days,
            timescale: 15,
            //timezone: "Europe%2FStockholm",
            format: "json"
        },
        success: function(data) {
            var name = data.channel.name;
            var temperature;
            $.each(data.feeds, function(index, val) {
                temperature = Number(val.field1);
                var datum = (Date.parse(val.created_at)) + (2*60*60)*1000; // GMT+2 timmar fulkod javascript mäter tydligen MS
                var temp = [datum,temperature];
                if(!isNaN(temperature)) {
                    dataFluff.push(temp);
                }
            });
            chart.addSeries({
                name: name,
                data: dataFluff
            });
            var ferg = (temperature<20) ? "red" : "green";
              if(temperature == null) {
                temperature = 'X';
            }
            $('.tempContainer').append('<div class="tempNu"><h3>'+ name + '</h3><h1 class="' + ferg + '">' + temperature +'</h1></div>');
            chart.reflow();
        }
    });
}

function drawGraph() {   
    var options = {
        chart: {
            type: 'spline',
            renderTo: 'chartContainer',
            zoomType: 'x'
        },
        title: {
            text: ''
        },
        xAxis: {
            type: 'datetime',
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        plotOptions: {
            series: {
                events: {
                    legendItemClick: function(e) {
                        var hideAllOthers = (e.browserEvent.metaKey || e.browserEvent.ctrlKey);
                        if (hideAllOthers) {
                            var seriesIndex = this.index;
                            var series = this.chart.series;

                            for (var i = 0; i < series.length; i++) {
                                if (series[i].index === seriesIndex) {
                                    if (!series[i].visible) series[i].setVisible(true, false);
                                } else {
                                    if (series[i].visible) series[i].setVisible(false, false);
                                }
                            }
                            this.chart.redraw();
                            return false;
                        }
                    }
                }
            }
        },




    };    
    chart = new Highcharts.Chart(options);
}
