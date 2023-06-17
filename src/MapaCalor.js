import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import CONFIG from "./config/config";

//Bibliografía: https://apexcharts.com/react-chart-demos/heatmap-charts/basic/

export default function MapaCalor(props) {

    const [calendario, setCalendario]=useState();
    const USE_SERVER = CONFIG.use_server;

    //ESTO VA A SER PARA SACAR EN QUE NUMERO DEL MES ESTAMOS, SIENDO EL 0 ENERO Y EL 11 DICIEMBRE
    const today = new Date();
    const currentMonth = today.getMonth()+1;
    const currentMonthString = currentMonth.toString();
    //console.log("HOY ES "+today + " Del mes "+ currentMonth+ " Que corresponde al "+currentMonthString)
    //HOY ES Fri Jun 09 2023 17:33:07 GMT+0200 (hora de verano de Europa central) Del mes 6 Que corresponde al 6
    //console.log(CONFIG.server_url_history + currentMonthString)

    //-----------------INICIALIZO LOS DATOS DEL CALENDARIO-----------------------
    const callServer = async () => {    
        if(USE_SERVER) {
          try {
            const response = await fetch(CONFIG.server_url_history + currentMonthString);
            const data = await response.json(); 
            //console.log("hola aquí está data")
            console.log("la cosa ha ido bien")
            console.log(data) 
            setCalendario(data);
          } catch (error) {
            console.log(error);
            setCalendario({ error: {description: error.message} });
          }
        } else {
            setCalendario("vaya no ha funcionado");
        console.log("la cosa ha ido mal")

          console.log(calendario)
        }
      }

    useEffect(() =>{
    callServer();
    //console.log("hola aquí está resultado")
    //console.log(calendario);
    }, [calendario]);
    //----------------------------------------------

    //calendario["2023-06-04"]["0"]


    //Lo que va a hacer es analizarme todo el array de objeto para la hora 0, si encuentra un objeto con la clave de la dirección mac 
    //determinada, le suma el valor a lo anterior
    const suma = (array) =>{
        let sum=0;
        array.forEach(obj => {
            //const value = obj["f8:8f:07:42:7f:e6"];
            const value = obj[props.direccionMac];
            if (typeof value === "number") {
                sum += value;
            }
            });
            //console.log("La suma de los números para la clave '94:6a:b0:5c:3b:29' es:", sum);

        return sum;
    }

    
    //-------------------------CREO EL ARCHIVO SERIES PARA METERLO EN EL MAPA DE CALOR----
    const series = [];
    for (const fecha in calendario) {
      if (calendario.hasOwnProperty(fecha)) {
        const data = [];
        
        for (let i = 0; i <= 23; i++) {
          data.push(suma(calendario[fecha][String(i)]));
        }
        
        const serie = {
          name: fecha,
          data: data
        };
        
        series.push(serie);
      }
    }
    //-------------------------CREO EL ARCHIVO SERIES PARA METERLO EN EL MAPA DE CALOR---- 
    
    const options = {
    chart: {
        height: 350,
        type: 'heatmap'
    },
    dataLabels: {
        enabled: false
    },
    colors: ["#008FFB"],
    title: {
        text: 'Minutos Conectados'
    },
    xaxis: {
        categories: ['Hora 0', 'Hora 1', 'Hora 2', 'Hora 3', 'Hora 4', 'Hora 5', 'Hora 6', '7', 'Hora 8', 'Hora 9', 'Hora 10', 'Hora 11', 'Hora 12', 'Hora 13', 'Hora 14', 'Hora 15', 'Hora 16', 'Hora 17', 'Hora 18', 'Hora 19', 'Hora 20', 'Hora 21', 'Hora 22', 'Hora 23']
    }
    };

    return (
      <div id="chart">
        <ReactApexChart options={options} series={series} type="heatmap" height={350} />
      </div>
    );
  }
  