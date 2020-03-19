//var hr_validar = <?php echo "$hrvectul"; ?>;
var DatoUlti = <?php echo "$ultimoDato"; ?>;
Highcharts.stockChart('container', {
    chart: {
        events: {
          load: function () {
    
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {

            var dateNew = $.ajax({
                url:"consulta_dinamica.php",
                dataType: "text",
                async: false
            }).responseText;                                          
            if(dateNew != DatoUlti ){    
            //if(dateNew == DatoUlti ){    
                var numDatos = parseFloat(dateNew) - parseFloat(DatoUlti);
                //var numDatos=2;
                var infAct = $.ajax({
                    type: "POST",
                    url: "cons_ult_datoN.php",
                    data: {
                     'numDatos' : numDatos,
                     'variable' : "tempout"
                    },
                    dataType: "json",
                    async: false,   
                    success: function (response) {
                      for (var x =0; x<numDatos;x++){
                        hr = response[x].hora;
                        hrSplit = hr.split(":");
                        minS = hrSplit[1];
                        jornada = minS[2];
                        if (jornada == "p"){        
                          hrSplit[0] = parseInt(hrSplit[0]) +12;
                        }
                        minS = parseInt(minS[0])*10 +parseInt(minS[1]);
                        //response[x].hora = {'hr':hrSplit[0],'min':minS};
                        
                        fecha = response[x].dia; 
                        fechaS = fecha.split("/");
                        timems = new Date(parseInt(fechaS[2])+2000, fechaS[0]-1, fechaS[1], hrSplit[0]-5, minS, 0, 0 );            
                        response[x].time_ms=timems.getTime();
                        response[x].pareja = [timems.getTime(),parseFloat(response[x].tempout)];
                        //response[x].dia = {'dia': fechaS[1], 'mes':fechaS[0],'year': parseInt(fechaS[2])+2000,'time_ms': timems.getTime()}
                      }             
                  }     
                }).responseJSON;
                //$("#div2").html(infAct[0].tempout);
                for (var c =(numDatos-1); c>=0;c--){
                    var ejex = infAct[c].time_ms;
                    var ejey = parseFloat (infAct[c].tempout);
                    //series.addPoint(infAct[c].pareja, true, true);
                    series.addPoint([ejex,ejey], true, true);
                }
                $("#div2").html(dateNew);                
            }
            
            $("#div1").html(DatoUlti);
            }, 1000*5);
          }
        }
      },

    rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1hr'
            
        }, {
            type: 'hour',
            count: 3,
            text: '3hr'
        }, {
            type: 'hour',
            count: 6,
            text: '6hr'
        }, {
            type: 'hour',
            count: 12,
            text: '12hr'			
        }, {
            type: 'ytd',
            text: 'YTD'
        }, {
            type: 'all',
            text: 'All'
        }]
},

    title: {
    text: 'Temeratura'
    },

    xAxis: {
            type:'datetime',           
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M', this.value);
                },                
            },
        },
        yAxis: {            
            tickInterval: 2,
            endOnTick: false,
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        
        plotOptions: {           
        series:{
            // hr = ,
            pointStart:Date.UTC(<?php echo "$fecha_part[2]+2000";?>,<?php echo "$fecha_part[0]-1";?>,<?php echo "$fecha_part[1]";?>, <?php echo "$vectHora[0]";?> , <?php echo "$vectHora[1]";?>, 0),
            pointInterval: 60 * 1000           }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Temperatura',
            data: [
                <?php
                arreglarDatos($manag_hr, $hora, $temp, $dia, $length);
                    
                ?>
            ],
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' °C'
            }
            
        }]


});


Highcharts.stockChart('huv', {
    chart: {
        events: {
          load: function () {
    
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {

            var dateNew = $.ajax({
                url:"consulta_dinamica.php",
                dataType: "text",
                async: false
            }).responseText;                                          
            if(dateNew != DatoUlti ){    
            //if(dateNew == DatoUlti ){    
                var numDatos = parseFloat(dateNew) - parseFloat(DatoUlti);
                //var numDatos=2;
                var infAct = $.ajax({
                    type: "POST",
                    url: "cons_ult_datoN.php",
                    data: {
                     'numDatos' : numDatos,
                     'variable' : "huiv"
                    },
                    dataType: "json",
                    async: false,   
                    success: function (response) {
                      for (var x =0; x<numDatos;x++){
                        hr = response[x].hora;
                        hrSplit = hr.split(":");
                        minS = hrSplit[1];
                        jornada = minS[2];
                        if (jornada == "p"){        
                          hrSplit[0] = parseInt(hrSplit[0]) +12;
                        }
                        minS = parseInt(minS[0])*10 +parseInt(minS[1]);
                        //response[x].hora = {'hr':hrSplit[0],'min':minS};
                        
                        fecha = response[x].dia; 
                        fechaS = fecha.split("/");
                        timems = new Date(parseInt(fechaS[2])+2000, fechaS[0]-1, fechaS[1], hrSplit[0]-5, minS, 0, 0 );            
                        response[x].time_ms=timems.getTime();
                        response[x].pareja = [timems.getTime(),parseFloat(response[x].huiv)];
                        //response[x].dia = {'dia': fechaS[1], 'mes':fechaS[0],'year': parseInt(fechaS[2])+2000,'time_ms': timems.getTime()}
                      }             
                  }     
                }).responseJSON;
                //$("#div2").html(infAct[0].tempout);
                for (var c =(numDatos-1); c>=0;c--){
                    var ejex = infAct[c].time_ms;
                    var ejey = parseFloat (infAct[c].huiv);
                    //series.addPoint(infAct[c].pareja, true, true);
                    series.addPoint([ejex,ejey], true, true);
                }
                $("#div2").html(dateNew);                
            }
            
            $("#div1").html(DatoUlti);
            }, 1000*5);
          }
        }
      },

    rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1hr'
            
        }, {
            type: 'hour',
            count: 3,
            text: '3hr'
        }, {
            type: 'hour',
            count: 6,
            text: '6hr'
        }, {
            type: 'hour',
            count: 12,
            text: '12hr'			
        }, {
            type: 'ytd',
            text: 'YTD'
        }, {
            type: 'all',
            text: 'All'
        }]
},

    title: {
    text: 'Índice UV'
    },

    xAxis: {
            type:'datetime',           
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M', this.value);
                },                
            },
        },
        yAxis: {            
            tickInterval: 2,
            endOnTick: false,
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        
        plotOptions: {           
        series:{
            // hr = ,
            pointStart:Date.UTC(<?php echo "$fecha_part[2]+2000";?>,<?php echo "$fecha_part[0]-1";?>,<?php echo "$fecha_part[1]";?>, <?php echo "$vectHora[0]";?> , <?php echo "$vectHora[1]";?>, 0),
            pointInterval: 60 * 1000           }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'HUV',
            data: [
                <?php
                arreglarDatos($manag_hr, $hora, $temp, $dia, $length);
                    
                ?>
            ],
            tooltip: {
                valueDecimals: 2
                //valueSuffix: ' '
            }
            
        }]


});


Highcharts.stockChart('rain', {
    chart: {
        events: {
          load: function () {
    
            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {

            var dateNew = $.ajax({
                url:"consulta_dinamica.php",
                dataType: "text",
                async: false
            }).responseText;                                          
            if(dateNew != DatoUlti ){    
            //if(dateNew == DatoUlti ){    
                var numDatos = parseFloat(dateNew) - parseFloat(DatoUlti);
                //var numDatos=2;
                var infAct = $.ajax({
                    type: "POST",
                    url: "cons_ult_datoN.php",
                    data: {
                     'numDatos' : numDatos,
                     'variable' : "rain"
                    },
                    dataType: "json",
                    async: false,   
                    success: function (response) {
                      for (var x =0; x<numDatos;x++){
                        hr = response[x].hora;
                        hrSplit = hr.split(":");
                        minS = hrSplit[1];
                        jornada = minS[2];
                        if (jornada == "p"){        
                          hrSplit[0] = parseInt(hrSplit[0]) +12;
                        }
                        minS = parseInt(minS[0])*10 +parseInt(minS[1]);
                        //response[x].hora = {'hr':hrSplit[0],'min':minS};
                        
                        fecha = response[x].dia; 
                        fechaS = fecha.split("/");
                        timems = new Date(parseInt(fechaS[2])+2000, fechaS[0]-1, fechaS[1], hrSplit[0]-5, minS, 0, 0 );            
                        response[x].time_ms=timems.getTime();
                        response[x].pareja = [timems.getTime(),parseFloat(response[x].rain)];
                        //response[x].dia = {'dia': fechaS[1], 'mes':fechaS[0],'year': parseInt(fechaS[2])+2000,'time_ms': timems.getTime()}
                      }             
                  }     
                }).responseJSON;
                //$("#div2").html(infAct[0].tempout);
                for (var c =(numDatos-1); c>=0;c--){
                    var ejex = infAct[c].time_ms;
                    var ejey = parseFloat (infAct[c].rain);
                    //series.addPoint(infAct[c].pareja, true, true);
                    series.addPoint([ejex,ejey], true, true);
                }
                $("#div2").html(dateNew);                
            }
            DatoUlti = dateNew;
            $("#div1").html(DatoUlti);
            }, 1000*5);
          }
        }
      },

    rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1hr'
            
        }, {
            type: 'hour',
            count: 3,
            text: '3hr'
        }, {
            type: 'hour',
            count: 6,
            text: '6hr'
        }, {
            type: 'hour',
            count: 12,
            text: '12hr'			
        }, {
            type: 'ytd',
            text: 'YTD'
        }, {
            type: 'all',
            text: 'All'
        }]
},

    title: {
    text: 'Lluvia'
    },

    xAxis: {
            type:'datetime',           
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M', this.value);
                },                
            },
        },
        yAxis: {            
            tickInterval: 2,
            endOnTick: false,
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        
        plotOptions: {           
        series:{
            // hr = ,
            pointStart:Date.UTC(<?php echo "$fecha_part[2]+2000";?>,<?php echo "$fecha_part[0]-1";?>,<?php echo "$fecha_part[1]";?>, <?php echo "$vectHora[0]";?> , <?php echo "$vectHora[1]";?>, 0),
            pointInterval: 60 * 1000           }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Lluvia',
            data: [
                <?php
                arreglarDatos($manag_hr, $hora, $rain, $dia, $length);
                    
                ?>
            ],
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' Cm^3x'
            }
            
        }]


});

/*
Highcharts.stockChart('temp', {

rangeSelector: {
    buttons: [{
        type: 'hour',
        count: 1,
        text: '1hr'
        
    }, {
        type: 'hour',
        count: 3,
        text: '3hr'
    }, {
        type: 'hour',
        count: 6,
        text: '6hr'
    }, {
        type: 'hour',
        count: 12,
        text: '12hr'			
    }, {
        type: 'ytd',
        text: 'YTD'
    }, {
        type: 'all',
        text: 'All'
    }]
},

title: {
text: 'Temperatura'
},

xAxis: {
        type:'datetime',
        //step: 24,
        //tickInterval: 5 * 60 * 1000,
    
    //minTickInterval: 24,
        labels: {
            formatter: function () {
                return Highcharts.dateFormat('%H:%M', this.value);
            },                
        },
    },
    yAxis: {
        
        tickInterval: 2,
        endOnTick: false,
        title: {
            text: null,
        },
        labels: {
            formatter: function () {
                return this.value;
            }
        }
    },
    
    plotOptions: {
    //area: {
    //  fillOpacity: 0.5,
    // fillColor:'red'
    //  color:'red'
    //},
    series:{
        // hr = ,
        pointStart:Date.UTC(<?php echo "$fecha_part[2]+2000";?>,<?php echo "$fecha_part[0]-1";?>,<?php echo "$fecha_part[1]";?>, <?php echo "$fecha_part[1]";?>, <?php echo "$vectHora[0]";?> , <?php echo "$vectHora[1]";?>, 0),
        pointInterval: 60 * 1000           }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Vlr.variable',
        data: [
            <?php
            //con el fin colocar losdatos extraidos de la bd en un arreglo para que Highchart 
            //lo grafique
                for ($i = $length; $i >= 0 ; $i--) {
                    // Hay unos datos los cuales no se definen como enteros, como por ejemplo "---" lo cual, no permite a la 
                    // API realizar la gráfica, por lo tanto se hace necesario un bloque de código para corregir esto.
                    // Primero se comprueba que si el dato es erroneo, si ese es el caso se pone en esa pocisión el dato anterior
                    // a ese,y si también es erroneo se toma el anteriora esey así sucesivamente hasta que el dato que se va a 
                    // gráfcar se correcto.
                    if ($temp[$i] == "---"){
                        $cont = 1;
                        $varcont = $temp[$i];
                        while($varcont == "---"){
                            $varcont = $temp[$i-$cont];
                            $cont++;
                        }

                        echo $varcont.","; 
                        
                    }else{
                        echo $temp[($i)].",";
                    }
                    
                    
                }
                
            ?>
        ],
        tooltip: {
    valueDecimals: 2
}
        
    }]

});

Highcharts.stockChart('lluvia', {

    chart: {
        alignTicks: false
    },
    
    rangeSelector: {
        buttons: [{
            type: 'hour',
            count: 1,
            text: '1hr'
            
        }, {
            type: 'hour',
            count: 3,
            text: '3hr'
        }, {
            type: 'hour',
            count: 6,
            text: '6hr'
        }, {
            type: 'hour',
            count: 12,
            text: '12hr'			
        }, {
            type: 'ytd',
            text: 'YTD'
        }, {
            type: 'all',
            text: 'All'
        }]
},

    title: {
    text: 'Lluvia'
    },

    xAxis: {
            type:'datetime',
            //step: 24,
            //tickInterval: 5 * 60 * 1000,
        
        //minTickInterval: 24,
            labels: {
                formatter: function () {
                    return Highcharts.dateFormat('%H:%M', this.value);
                },                
            },
        },
        yAxis: {
            //max: 18,
            tickInterval: 2,
            endOnTick: false,
            title: {
                text: null,
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        
        plotOptions: {
        //area: {
          //  fillOpacity: 0.5,
           // fillColor:'red'
         //  color:'red'
        //},
        series:{
            // hr = ,
            pointStart:Date.UTC(<?php echo "$fecha_part[2]+2000";?>,<?php echo "$fecha_part[0]-1";?>,<?php echo "$fecha_part[1]";?>, <?php echo "$fecha_part[1]";?>, <?php echo "$vectHora[0]";?> , <?php echo "$vectHora[1]";?>, 0),
            pointInterval: 60 * 1000           }
        },
        credits: {
            enabled: false
        },
        series: [{
            name: 'Lluvia en mL',
            data: [
                <?php
                //con el fin colocar losdatos extraidos de la bd en un arreglo para que Highchart 
                //lo grafique
                    for ($i = $length; $i >= 0 ; $i--) {
                        echo $rain[$i].",";
                    }
                    
                ?>
            ]/*,
            dataGrouping: {
                units: [[
                    'week', // unit name
                    [1] // allowed multiples
                ], [
                    'month',
                    [1, 2, 3, 4, 6]
                ]]
            }
            tooltip: {
        valueDecimals: 2
    }*/
            /*
        }]


});
*/
