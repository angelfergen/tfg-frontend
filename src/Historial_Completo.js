
import { useState } from 'react';
import { useEffect } from 'react';
import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import CONFIG from "./config/config";


export default function Historial_Completo(){

    const [calendario, setCalendario]=useState();
    const USE_SERVER = CONFIG.use_server;

    //ESTO VA A SER PARA SACAR EN QUE NUMERO DEL MES ESTAMOS, SIENDO EL 0 ENERO Y EL 11 DICIEMBRE
    const today = new Date();
    const currentMonth = today.getMonth()+1;
    const currentMonthString = currentMonth.toString();
    //console.log(CONFIG.server_url_history + currentMonthString)
    const callServer = async () => {    
        if(USE_SERVER) {
          try {
            const response = await fetch(CONFIG.server_url_history + currentMonthString);
            const data = await response.json(); 
            //console.log("hola aquí está data") 
            //console.log(data)  
            //console.log(data[0])
            //Para sacar la fecha y hora
            //console.log(data[0].log)
            //console.log(data[0].log.split(" "))//con esto lo que hago es dividir la fecha y la hora
            //console.log(data[0].log.split(" ")[1])//con esto la hora
            //console.log(data[0].log.split(" ")[1].split(":")[0])//horas
            //console.log(data[0].log.split(" ")[1].split(":")[1])//minutos
            //console.log(data[0].log.split(" ")[1].split(":")[2])//segundos
            //console.log(data[0].log.split(" ")[0].split("-"))// ahora separo los años/meses/dias
            //console.log(data[0].log.split(" ")[0].split("-")[2])//asi saco el día ["2023","05","06"]
            /////////////
            //console.log(data[0].mac_address)
            //const datos_filtrados = data.filter(historial =>
                //historial.mac_address == "94:6a:b0:5c:3b:29"
            //    historial.mac_address == props.mac_address
            //);
            //console.log("HOLA, DATOS FILTRADOS")
            //console.log(datos_filtrados)
            setCalendario(data);
            //console.log("hola aquí está calendario")
            //console.log(calendario)
    
          } catch (error) {
            console.log(error);
            setCalendario({ error: {description: error.message} });
          }
        } else {
            setCalendario("vaya no ha funcionado");
          console.log(calendario)
        }
      }

      useEffect(() =>{
        callServer();
        //console.log("hola aquí está resultado")
        //console.log(calendario);
      }, [calendario]);


        //El && lo ponemos para salvarnos de que nos de error en caso de que datos fultrados sea undefined
        const eventos = calendario && calendario.map(historial => {
            const mac_address = historial.mac_address;
            const fechaHora = historial.log.split(" ");//separo la fecha de la hora
            const fecha = fechaHora[0];
            const hora = fechaHora[1].split(":");//separo las horas/minutos/segundos
            const horas = hora[0];
            const minutos = hora[1];
            return {
              title: mac_address,
              start: `${fecha}T${horas}:${minutos}:00`,
              end: `${fecha}T${horas}:${minutos}:01`,
            };
          });
          

    return(
        <div style={{ margin:"20px"}}>
            <h2>Historial de Conexiones</h2>

            <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={eventos}
        editable={false}
             />

        </div>
    )
}