import ReactApexChart from 'react-apexcharts';
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import CONFIG from "./config/config";


//Bibliografía: https://apexcharts.com/react-chart-demos/heatmap-charts/basic/


export default function HeatMap3() {

  
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
        text: 'Historial de las conexiones del dispositivo'
      },
      xaxis: {
        categories: ['Hora 0', 'Hora 1', 'Hora 2', 'Hora 3', 'Hora 4', 'Hora 5', 'Hora 6', '7', 'Hora 8', 'Hora 9', 'Hora 10', 'Hora 11', 'Hora 12', 'Hora 13', 'Hora 14', 'Hora 15', 'Hora 16', 'Hora 17', 'Hora 18', 'Hora 19', 'Hora 20', 'Hora 21', 'Hora 22', 'Hora 23']
      }
    };

    const objeto = {
        "0": [
            {
                "94:6a:b0:5c:3b:29": 15,
                "4e:a7:39:cd:10:d2": 13,
                "34:25:be:f1:94:27": 12,
                "f8:8f:07:42:7f:e6": 6,
                "90:32:4b:94:3a:8b": 3,
                "null": 15,
                "18:60:24:33:42:fa": 14,
                "5c:0c:e6:7f:6e:1e": 8,
                "b8:76:3f:48:a3:0c": 15,
                "a0:9f:10:1a:bd:fc": 13,
                "00:00:00:00:00:00": 2,
                "72:52:cb:9e:ed:4a": 3,
                "ee:25:61:93:dc:ce": 6,
                "ea:fd:36:8c:10:30": 3
            },
            {
                "94:6a:b0:5c:3b:29": 15,
                "4e:a7:39:cd:10:d2": 15,
                "ee:25:61:93:dc:ce": 3,
                "34:25:be:f1:94:27": 13,
                "null": 15,
                "18:60:24:33:42:fa": 15,
                "5c:0c:e6:7f:6e:1e": 10,
                "72:52:cb:9e:ed:4a": 9,
                "b8:76:3f:48:a3:0c": 15,
                "a0:9f:10:1a:bd:fc": 15,
                "ea:fd:36:8c:10:30": 2,
                "f8:8f:07:42:7f:e6": 5
            },
            {
                "94:6a:b0:5c:3b:29": 15,
                "4e:a7:39:cd:10:d2": 15,
                "34:25:be:f1:94:27": 14,
                "null": 15,
                "18:60:24:33:42:fa": 15,
                "5c:0c:e6:7f:6e:1e": 6,
                "72:52:cb:9e:ed:4a": 12,
                "b8:76:3f:48:a3:0c": 15,
                "a0:9f:10:1a:bd:fc": 15,
                "ea:fd:36:8c:10:30": 7,
                "f8:8f:07:42:7f:e6": 4
            },
            {
                "94:6a:b0:5c:3b:29": 15,
                "4e:a7:39:cd:10:d2": 14,
                "34:25:be:f1:94:27": 11,
                "f8:8f:07:42:7f:e6": 7,
                "null": 15,
                "18:60:24:33:42:fa": 15,
                "72:52:cb:9e:ed:4a": 10,
                "b8:76:3f:48:a3:0c": 15,
                "a0:9f:10:1a:bd:fc": 15,
                "5c:0c:e6:7f:6e:1e": 6,
                "ea:fd:36:8c:10:30": 3
            }
        ]
    }
    const todos_datos={
        "2023-06-04":{
            "0":[{"94:6a:b0:5c:3b:29":15,
            "4e:a7:39:cd:10:d2":13,
            "34:25:be:f1:94:27":6,
            "f8:8f:07:42:7f:e6":3,
            "null":15,
            "18:60:24:33:42:fa":15,
            "5c:0c:e6:7f:6e:1e":8,
            "ec:0e:c4:8c:76:dd":15,
            "72:52:cb:9e:ed:4a":10,
            "b8:76:3f:48:a3:0c":15,
            "a0:9f:10:1a:bd:fc":14,
            "ee:25:61:93:dc:ce":6,
            "ea:fd:36:8c:10:30":4,
            "50:3d:c6:5b:65:81":1},
            {"94:6a:b0:5c:3b:29":15,
            "4e:a7:39:cd:10:d2":9,
            "34:25:be:f1:94:27":11,
            "null":15,
            "18:60:24:33:42:fa":15,
            "5c:0c:e6:7f:6e:1e":10,
            "ec:0e:c4:8c:76:dd":15,
            "72:52:cb:9e:ed:4a":10,
            "b8:76:3f:48:a3:0c":15,
            "a0:9f:10:1a:bd:fc":14,
            "ea:fd:36:8c:10:30":7,
            "50:3d:c6:5b:65:81":5},
            {"94:6a:b0:5c:3b:29":15,
            "4e:a7:39:cd:10:d2":8,
            "34:25:be:f1:94:27":9,
            "null":15,
            "18:60:24:33:42:fa":15,
            "ec:0e:c4:8c:76:dd":15,
            "b8:76:3f:48:a3:0c":15,
            "a0:9f:10:1a:bd:fc":15,
            "5c:0c:e6:7f:6e:1e":4,
            "72:52:cb:9e:ed:4a":4,
            "50:3d:c6:5b:65:81":2,
            "ea:fd:36:8c:10:30":4},
            {"94:6a:b0:5c:3b:29":15,
            "4e:a7:39:cd:10:d2":14,
            "ea:fd:36:8c:10:30":6,
            "null":15,
            "18:60:24:33:42:fa":15,
            "ec:0e:c4:8c:76:dd":15,
            "72:52:cb:9e:ed:4a":11,
            "b8:76:3f:48:a3:0c":15,
            "a0:9f:10:1a:bd:fc":15,
            "34:25:be:f1:94:27":12,
            "5c:0c:e6:7f:6e:1e":10}],
            "1":[{"94:6a:b0:5c:3b:29":15,
            "4e:a7:39:cd:10:d2":11,
            "null":15,
            "18:60:24:33:42:fa":15,
            "ec:0e:c4:8c:76:dd":11,
            "72:52:cb:9e:ed:4a":9,
            "b8:76:3f:48:a3:0c":15,
            "a0:9f:10:1a:bd:fc":14,
            "34:25:be:f1:94:27":10,
            "ea:fd:36:8c:10:30":3,
            "5c:0c:e6:7f:6e:1e":5},
            {"94:6a:b0:5c:3b:29":15,
            "a0:9f:10:1a:bd:fc":15,
            "34:25:be:f1:94:27":10,
            "5c:0c:e6:7f:6e:1e":7},
            {"94:6a:b0:5c:3b:29":15,
            "null":15,
            "18:60:24:33:42:fa":15,
            "5c:0c:e6:7f:6e:1e":11,
            "72:52:cb:9e:ed:4a":11,
            "a0:9f:10:1a:bd:fc":15,
            "ea:fd:36:8c:10:30":2},
            {"94:6a:b0:5c:3b:29":15,
            "4e:a7:39:cd:10:d2":14,
            "34:25:be:f1:94:27":13,
            }]
        }
    }
    //todos_datos["2023-06-04"]["0"]
    //const arrayElement0 = todos_datos["2023-06-04"]["0"]; //Así accedo a la hora que yo quiero

    //const arrayElement0 = objeto["0"]; //Así accedo a la hora que yo quiero
    const suma = (array) =>{
        let sum=0;
        array.forEach(obj => {
            const value = obj["f8:8f:07:42:7f:e6"];
            if (typeof value === "number") {
                sum += value;
            }
            });
            //console.log("La suma de los números para la clave '94:6a:b0:5c:3b:29' es:", sum);

        return sum;
    }

    const series1 = [
        {
          name: 'Metric1',
          data: [suma(todos_datos["2023-06-04"]["0"]),suma(todos_datos["2023-06-04"]["1"]),2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric2',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric3',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
        },
        {
          name: 'Metric4',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric5',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric6',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric7',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric8',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        },
        {
          name: 'Metric9',
          data: [0,1,2,3,4,5,6,7,8,9,10,5,12,13,14,15,16,0,0,1,2,3,1,0]
  
        }
      ];
    
    
    //Lo que va a hacer es analizarme todo el array de objeto para la hora 0, si encuentra un objeto con la clave de la dirección mac 
    //determinada, le suma el valor a lo anterior


    /*
    // Acceder al elemento 0 del arreglo
    const arrayElement0 = data["0"];

    // Inicializar la variable para almacenar la suma
    let sum = 0;

    // Iterar sobre el arreglo y sumar los valores asociados a la clave "94:6a:b0:5c:3b:29"
    arrayElement0.forEach(obj => {
    const value = obj["94:6a:b0:5c:3b:29"];
    if (typeof value === "number") {
        sum += value;
    }
    });

    console.log("La suma de los números para la clave '94:6a:b0:5c:3b:29' es:", sum);
    */ 
    const [calendario, setCalendario]=useState();
    const USE_SERVER = CONFIG.use_server;

    //ESTO VA A SER PARA SACAR EN QUE NUMERO DEL MES ESTAMOS, SIENDO EL 0 ENERO Y EL 11 DICIEMBRE
    const today = new Date();
    const currentMonth = today.getMonth()+1;
    const currentMonthString = currentMonth.toString();
    //console.log("HOY ES "+today + " Del mes "+ currentMonth+ " Que corresponde al "+currentMonthString)
    //HOY ES Fri Jun 09 2023 17:33:07 GMT+0200 (hora de verano de Europa central) Del mes 6 Que corresponde al 6
   
    //console.log(CONFIG.server_url_history + currentMonthString)

    console.log("AQUI ESTÁ EL CALENDARIO",calendario)

    //----------------------------------------------
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
    
    
    
    return (
      <div id="chart">
        <ReactApexChart options={options} series={series} type="heatmap" height={350} />
      </div>
    );
  }
  