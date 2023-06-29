import "./static/templates/lista.css";
import { useState } from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";
import HeatMap from "./HeatMap";
import Dispositivo from "./Dipositivo";
import Historial_Completo from "./Historial_Completo";
import Calendario from "./Calendario";
import Navbar from "./NavBar";
import Conocidos from "./Conocidos";
import Formulario from "./Formulario";
import Formulario_Conocidos from "./Formulario_Conocidos";
import HeatMap2 from "./HeatMap2";
import Habitaciones from "./Habitaciones";
import Dispositivos_Habitaciones from "./Dispositivos_Habitaciones";
import CONFIG from "./config/config";
import HeatMap3 from "./HeatMap3";
import MapaCalor_todos from "./MapaCalor_todos";


export default function Lista (props){

  const USE_SERVER = CONFIG.use_server;


  const [loading,setLoading]= useState(true);
  const [lista,setLista] = useState(true);
  const [listaConocidos,setListaConocidos] = useState(false);
  const [listaDispositivo,setListaDispositivo] = useState(false);
  const [formulario,setFormulario] = useState(false);
  const [formularioConocido,setformularioConocido] = useState(false);
  const [dispositivoId, setDispositivoId] = useState(null);
  const [habitaciones,setHabitaciones] = useState(false);
  const [estancia, setEstancia] = useState(false);
  const [direccionesMac, setDireccionesMac] = useState ();
  const [vistaCalendario, setVistaCalendario] = useState ();
  const [calendario, setCalendario]=useState();

  //const dispositivos = props.dipositivos;
  const datos_pruebas_todos = [
    {
        "hostnames": [
            {
                "name": "liveboxfibra",
                "type": "PTR"
            }
        ],
        "addresses": {
            "ipv4": "192.168.1.1"
        },
        "vendor": {},
        "status": {
            "state": "up",
            "reason": "syn-ack"
        },
        "mac": "94:6a:b0:5c:3b:29"
    },
    {
        "hostnames": [
            {
                "name": "",
                "type": ""
            }
        ],
        "addresses": {
            "ipv4": "192.168.1.113"
        },
        "vendor": {},
        "status": {
            "state": "up",
            "reason": "conn-refused"
        },
        "mac": "34:25:be:f1:94:27"
    },
    {
        "hostnames": [
            {
                "name": "raspberrypi.home",
                "type": "PTR"
            }
        ],
        "addresses": {
            "ipv4": "192.168.1.27"
        },
        "vendor": {},
        "status": {
            "state": "up",
            "reason": "conn-refused"
        },
        "mac": null
    },
    {
        "hostnames": [
            {
                "name": "Galaxy-Tab-A.home",
                "type": "PTR"
            }
        ],
        "addresses": {
            "ipv4": "192.168.1.56"
        },
        "vendor": {},
        "status": {
            "state": "up",
            "reason": "conn-refused"
        },
        "mac": "e8:3a:12:47:16:e5"
    },
    {
        "hostnames": [
            {
                "name": "HP3342FA.home",
                "type": "PTR"
            }
        ],
        "addresses": {
            "ipv4": "192.168.1.61"
        },
        "vendor": {},
        "status": {
            "state": "up",
            "reason": "syn-ack"
        },
        "mac": "18:60:24:33:42:fa"
    },
    {
        "hostnames": [
            {
                "name": "",
                "type": ""
            }
        ],
        "addresses": {
            "ipv4": "192.168.1.84"
        },
        "vendor": {},
        "status": {
            "state": "up",
            "reason": "conn-refused"
        },
        "mac": "a0:9f:10:1a:bd:fc"
    }
];
  //const dispositivos = datos_pruebas_todos;
  const datos_pruebas_conocidos = {
    "94:6a:b0:5c:3b:29": {
        "type": "Router",
        "owner": "Pruden",
        "location": "despacho",
        "allowed": "True"
    },
    "18:60:24:33:42:fa": {
        "type": "Impresora",
        "owner": "Angel",
        "location": "dormitorio principal",
        "allowed": "True"
    },
    "00:00:00:00": {
        "type": "aspiradora",
        "owner": "angel",
        "location": "otra estancia",
        "allowed": "true"
    }
}
const[conocidos,setConocidos] = useState(null)
const [dispositivos, setDispositivos] = useState(null)

const callServer = async () => {    
    if(USE_SERVER) {
      try {
        const response = await fetch(`${CONFIG.server_url_ari}`);
        const data = await response.json(); 
        console.log("hola aquí está data") 

        setDispositivos(data);
        console.log("hola aquí están dispositivos")
        //console.log("hola aquí está resultado")
        console.log(dispositivos)

      } catch (error) {
        console.log(error);
        setDispositivos({ error: {description: error.message} });
      }
    } else {
      setDispositivos(datos_pruebas_todos);
      console.log(dispositivos)
    }
  }
  const callServer_conocidos = async () => {    
    if(USE_SERVER) {
      try {
        const response = await fetch(`${CONFIG.server_url_conocidos}`);
        const data = await response.json(); 
        console.log("hola aquí está data2")  
        
        setConocidos(data);
        console.log("hola aquí está conocidos")
        console.log(conocidos)
        
      } catch (error) {
        console.log(error);
        setDispositivos({ error: {description: error.message} });
      }
    } else {
      setConocidos(datos_pruebas_conocidos);
      setDireccionesMac(Object.keys(conocidos)); //Se usa pasa sacar cual es la clave de cada objeto.
                                                    //Ya que se trata de un objeto json que tiene clave y valor, siendo la clave la direccion mac, 
                                                    //la cual es variables, y es la unica forma de sacarlo así, y luego el valor el resto de atributos que tiene
                                                    //este dispositivo, es decir, type, owner, location, allowed

    }
  }
/*
useEffect(() => {
const interval = setInterval(() => {
    callServer();
    console.log("Hola, aquí está el resultado:", dispositivos);
}, 30000);


return () => clearInterval(interval);
}, [dispositivos]);
*/
useEffect(() => {
    callServer();
    callServer_conocidos();

    const intervalo1 = setInterval(callServer, 30000);
    const intervalo2 = setInterval(callServer_conocidos, 30000);

    return () => {
        clearInterval(intervalo1);
        clearInterval(intervalo2);
    };
}, []);


/*
useEffect(() => {
const interval = setInterval(() => {
    callServer_conocidos();
    console.log("Hola, aquí están los resultados conocidos:", conocidos);
}, 30000);

return () => clearInterval(interval);
}, [conocidos]);
*/


  //const conocidos = props.conocidos;
  //const conocidos = datos_pruebas_conocidos;
  //const direccionesMAC = props.direccionesMAC;

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
      setLoading(false);
    }, 4000);
    }
  }, [loading]);

    const conocerDispositivo = (direccionMac) => {
        if(Object.keys(conocidos).includes(direccionMac)){
            return "Dispositivo conocido";
        } else
        return "Dispositivo desconocido";
    }

    const verConocidos = () =>{
        setLista(false);
        setListaConocidos(true);
        setListaDispositivo(false);
        }
    const verDispositivo = (numero) =>{
        setLista(false);
        setListaConocidos(false);
        setListaDispositivo(true);
        setDispositivoId(numero);
        }
    const conseguirDireccionMac =(item) =>{
        console.log(Object.keys(conocidos)[dispositivoId])
    }




            

/**--------------------------------------------- */
const today = new Date();
const currentMonth = today.getMonth()+1;
const currentMonthString = currentMonth.toString();
//console.log("HOY ES "+today + " Del mes "+ currentMonth+ " Que corresponde al "+currentMonthString)
//HOY ES Fri Jun 09 2023 17:33:07 GMT+0200 (hora de verano de Europa central) Del mes 6 Que corresponde al 6
//console.log(CONFIG.server_url_history + currentMonthString)

//-----------------INICIALIZO LOS DATOS DEL CALENDARIO-----------------------
const callServerCalendario = async () => {    
    if(USE_SERVER) {
      try {
        const response = await fetch(CONFIG.server_url_history + currentMonthString);
        const data = await response.json(); 
        //console.log("hola aquí está data")
        //console.log("la cosa ha ido bien")
        //console.log(data) 
        setCalendario(data);
      } catch (error) {
        console.log(error);
        setCalendario({ error: {description: error.message} });
      }
    } else {
        setCalendario("vaya no ha funcionado");
        //console.log("la cosa ha ido mal")
        //console.log(calendario)
    }
  }

useEffect(() =>{
callServerCalendario();
//console.log("hola aquí está resultado")
//console.log(calendario);
}, [calendario]);
          
  return (
    <div className="App">
        <Navbar lista = {lista} 
        listaConocidos = {listaConocidos} 
        listaDispositivo = {listaDispositivo}         
        setLista={setLista}
        setListaConocidos={setListaConocidos}
        setListaDispositivo={setListaDispositivo}
        setFormulario={setFormulario}
        setformularioConocido = {setformularioConocido}
        setHabitaciones={setHabitaciones}
        setEstancia={setEstancia}
        setVistaCalendario = {setVistaCalendario}
        onLogout ={props.onLogout}
/>
      {loading ? <div class="spinner-cajita">
                    <div class="spinner-border" role="status">
                    </div>
                    <div class="spinner-texto">Analizando la Red en busca de dispositivos</div>
                  </div>
              : lista && dispositivos && <div id='dispositivos'>
               
               <h3 id="cabecera_todos">Estos son todos los dispositivos conectados en la red</h3>
               <table class="table table-striped">
                  <thead>
                    <tr>
                      {/*console.log("HOLAAAAA")*/}  
                      {/*console.log(dispositivos)*/}
                      <th scope="col">#</th>
                      <th scope="col">Direccion IP</th>
                      <th scope="col">Nombre del Dipositivo</th>
                      <th scope="col">Dirección MAC</th>
                      <th scope="col">Tipo de Dispositivo</th>
                      <th scope="col"></th>
                
                    </tr>
                  </thead>
                    {dispositivos.map((item, index) => {
                    //console.log(index)
                    //console.log("AMORESSSSSSS")
                    //console.log("REPUTATION "+JSON.stringify(item.mac));
                    //console.log("AQUI LOS CONOCIDOS BRRRRRR "+JSON.stringify(conocidos))
                    //console.log("AQUI LOS REALES BRRRRRR "+Object.keys(conocidos[0]))
                    //console.log("Aqui el final " + (item.mac in conocidos[0]));                    return null; // Opcional: Puedes reemplazar `null` con el componente JSX que deseas renderizar para cada objeto
                    })}

                  {dispositivos.map((item,number) => (
                  <tbody>
                    <tr>
                      <th scope="row">{number}</th>
                      <td>{item.addresses.ipv4}</td>
                      <td>{item.hostnames[0].name}</td>
                      <td>{item.mac}</td>
                      { 
                        item.mac in conocidos[0] ?
                        <td className="conocido">Dispositivo Conocido</td>
                        :
                        <td class="desconocido">Dispositivo Desconocido</td>
                      }
                      <td><Button className="btn btn-info" onClick={()=>verDispositivo(number)}>Ver Más Información</Button></td>
                      {/*<td><Link to={"/dipositivos/"+number}><Button className="btn btn-info">Ver Más Información</Button></Link></td>*/}
                      
                    </tr>
                  </tbody>
                                  ))}
                </table>
                {!listaConocidos && <Button onClick={()=>verConocidos()}>Ver todos los dispositivos conocidos</Button> }
                </div>
       }

      {listaConocidos && <div id="conocidos">
                    <Conocidos 
                    conocidos={conocidos}
                    setConocidos={setConocidos}
                    setLista = {setLista}
                    setListaConocidos = {setListaConocidos}
                    setListaDispositivo={setListaDispositivo}
                    setFormulario={setFormulario}
                    setformularioConocido = {setformularioConocido}
                    setDispositivoId = {setDispositivoId}


                    />
                   </div>
       }
       

       {listaDispositivo && <div id="dispositivo">
                            <Dispositivo numero = {dispositivoId}
                                        conocidos = {conocidos}
                                        dispositivos = {dispositivos}
                                        setLista = {setLista}
                                        setListaConocidos = {setListaConocidos}
                                        setListaDispositivo={setListaDispositivo}
                                        setFormulario={setFormulario}
                                        setformularioConocido = {setformularioConocido}
                                        setDispositivoId = {setDispositivoId}
                                        setDispositivos = {setDispositivos}
                            />
                            </div>
       }

       {formulario && <div>
                    <Formulario numero = {dispositivoId}
                                setLista = {setLista}
                                setListaConocidos = {setListaConocidos}
                                setListaDispositivo={setListaDispositivo}
                                setFormulario={setFormulario}
                                setformularioConocido = {setformularioConocido}
                                conocidos = {conocidos}
                                dispositivos = {dispositivos}
                    />
                       </div>
        }

        {formularioConocido && <div>
                    <Formulario_Conocidos   dispositivoId = {dispositivoId}
                                            setDispositivoId = {setDispositivoId}
                                            setLista = {setLista}
                                            setListaConocidos = {setListaConocidos}
                                            setListaDispositivo={setListaDispositivo}
                                            setFormulario={setFormulario}
                                            setformularioConocido = {setformularioConocido}
                                            conocidos = {conocidos}
                    />
                                </div>

        }

        {habitaciones && <div>
                    <Habitaciones 
                    setLista = {setLista}
                    setListaConocidos = {setListaConocidos}
                    setListaDispositivo={setListaDispositivo}
                    setFormulario={setFormulario}
                    setformularioConocido = {setformularioConocido}
                    habitaciones = {habitaciones}
                    estancia={estancia}
                    conocidos = {conocidos}
                    setHabitaciones = {setHabitaciones}
                    setEstancia = {setEstancia}
                    />
                         </div>

        }

        {estancia && <div>

            <Dispositivos_Habitaciones 
                                    estancia={estancia}
                                    setEstancia={setEstancia}
                                    conocidos = {conocidos}
                                    setHabitaciones = {setHabitaciones}
                                    dispositivoId = {dispositivoId}
                                    setDispositivoId = {setDispositivoId}
                                    dispositivos = {dispositivos}
                                    
                                    setLista = {setLista}
                                    setListaConocidos = {setListaConocidos}
                                    setListaDispositivo={setListaDispositivo}
                                    setFormulario={setFormulario}
                                    setformularioConocido = {setformularioConocido}
                                    
                                    />
    
                       </div>    
        }
       
        {vistaCalendario && <div>
                            <MapaCalor_todos calendario={calendario} setCalendario={setCalendario}/>
                            </div>
        }
      
    </div>
  );
}

