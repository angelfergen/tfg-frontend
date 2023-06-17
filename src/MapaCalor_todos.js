import ReactApexChart from 'react-apexcharts';
import React from 'react';

//Bibliografía: https://apexcharts.com/react-chart-demos/heatmap-charts/basic/

export default function MapaCalor_todos(props) {

    let calendario=props.calendario;
    let setCalendario=props.setCalendario;

    //*****************************************************/
    /*const data = {
        "2023-06-03": {
          "0": [
            {"00:00:00:00": 3, "11:11:11:11": 2},
            {"00:00:00:00": 7, "11:11:11:11": 5}
          ],
          "1": [
            {"00:00:00:00": 13, "11:11:11:11": 25},
            {"00:00:00:00": 9, "11:11:11:11": 6}
          ]
        }
      };*/
      //console.log(data["2023-06-03"][0][0]["00:00:00:00"])
      
    // Calcular la suma por día y dirección MAC
    const calcularSumaPorDia = (data) => {
        const sumaPorDia = {};
    
        for (const fecha in data) {                 //El for que me va a recorrer todos los DÍAS
            for (const hora in data[fecha]) {   //El for que me va a recorrer todas las HORAS
                const objetos = data[fecha][hora];  //Me creo un objeto donde voy a ir almacenando toda la información relativa a cada hora
        
                for (const intervalo of objetos) {     //4 Objetos de cada 15 minutos
                    for (const direccionMac in intervalo) {    //Aquí ya entro a cada objeto de cada 15 minutos
                        const valor = intervalo[direccionMac]; //Me guardo el valor de la dirección mac
            
                        if (sumaPorDia[fecha]) {                    //Compruebo que hay información de ese día
                        if (sumaPorDia[fecha][direccionMac]) {      //Compruebo que hay información de esa mac
                            sumaPorDia[fecha][direccionMac] += valor;   //Si la hay le sumo el valor que he visto
                        } else {
                            sumaPorDia[fecha][direccionMac] = valor;    //Si no, le pongo el valor que he visto
                        }
                        } else {                           //Si no hay info relativa de ese día, le meto la primera mac que estoy viendo con el valor que tiene
                        sumaPorDia[fecha] = {               //Solo voy a pasar por aquí cuando sea la primera vez que se ve la información de cada día
                            [direccionMac]: valor
                        };
                        }
                    }
                }
            }
        }
        return sumaPorDia;
    };

    const datosFinales = calcularSumaPorDia(calendario);
    const fechas = Object.keys(datosFinales);
    const dispositivos = Object.keys(datosFinales[fechas[0]]);
    
    const series = fechas.map((fecha) => ({
      name: fecha,
      data: dispositivos.map((dispositivo) => datosFinales[fecha][dispositivo] || 0)
    }));
      
    const options = {
        chart: {
            height: 350,
            type: 'heatmap'
        },
        dataLabels: {
            enabled: false
        },
        colors: ["#008FFB"],
        xaxis: {
            categories: dispositivos,
          },
          yaxis: {
            categories: fechas,
          },
        };
    
    /******************************************************/

    return (
      <div id="chart">
        <h3>Aquí tiene un historial de todos los dispositivos que se han conectado durante este mes</h3>
        <ReactApexChart options={options} series={series} type="heatmap" height={350} />
      </div>
    );
  }
  