import "./static/templates/dispositivo.css";
import {Link, useParams} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import CONFIG from "./config/config";
import { useState } from "react";
//import Calendario from "./Calendario";
import MapaCalor from "./MapaCalor";



/*
Tipos de dispositivos que puede haber:
    - Router
    - Impresora
    - Television
    - Ordenador
    - Móvil
    - Consola
    - Altavoz
    - Reloj
    - Tablet
    - Aspiradora
    - Otro
*/

export default function Dispositivo (props) {
    const dispositivoId = props.numero;
    //let { dispositivoId } = useParams();
    
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
];  const datos_pruebas_conocidos = {
    "94:6a:b0:5c:3b:29": {
        "type": "Router",
        "owner": "Pruden",
        "location": "casa",
        "allowed": "True"
    },
    "18:60:24:33:42:fa": {
        "type": "Impresora",
        "owner": "Angel",
        "location": "casa",
        "allowed": "True"
    },
    "00:00:00:00": {
        "type": "blabla",
        "owner": "angel",
        "location": "bellodrama",
        "allowed": "true"
    }
}
    const datos_pruebas_todos2= [{"hostnames":[{"name":"liveboxfibra","type":"PTR"}],"addresses":{"ipv4":"192.168.1.1"},"vendor":"Arcadyan Corporation","status":{"state":"up","reason":"syn-ack"},"mac":"94:6a:b0:5c:3b:29"},{"hostnames":[{"name":"Chromecast.home","type":"PTR"}],"addresses":{"ipv4":"192.168.1.111"},"vendor":"Google, Inc.","status":{"state":"up","reason":"conn-refused"},"mac":"f0:72:ea:e5:e5:7a"},{"hostnames":[{"name":"","type":""}],"addresses":{"ipv4":"192.168.1.113"},"vendor":"Amazon Technologies Inc.","status":{"state":"up","reason":"conn-refused"},"mac":"34:25:be:f1:94:27"},{"hostnames":[{"name":"raspberrypi.home","type":"PTR"}],"addresses":{"ipv4":"192.168.1.27"},"vendor":"Raspberry Pi Foundation","status":{"state":"up","reason":"conn-refused"},"mac":"b8:27:eb:98:a0:60"},{"hostnames":[{"name":"HP3342FA.home","type":"PTR"}],"addresses":{"ipv4":"192.168.1.61"},"vendor":"Hewlett Packard","status":{"state":"up","reason":"syn-ack"},"mac":"18:60:24:33:42:fa"},{"hostnames":[{"name":"","type":""}],"addresses":{"ipv4":"192.168.1.81"},"vendor":"HUNAN FN-LINK TECHNOLOGY LIMITED","status":{"state":"up","reason":"conn-refused"},"mac":"d4:8a:3b:12:54:b0"},{"hostnames":[{"name":"","type":""}],"addresses":{"ipv4":"192.168.1.84"},"vendor":"SHENZHEN BILIAN ELECTRONIC CO.,LTD","status":{"state":"up","reason":"conn-refused"},"mac":"a0:9f:10:1a:bd:fc"}]
    //const dispositivos = datos_pruebas_todos2;
    const dispositivos = props.dipositivos;
    const conocidos = props.conocidos[0];
    //const conocidos = datos_pruebas_conocidos;
    const [puertos, setPuertos] = useState();

    const USE_SERVER = CONFIG.use_server;
    console.log("CONCIDOS "+JSON.stringify(props.conocidos))
    console.log("DISPOSITIVOS "+JSON.stringify(props.dispositivos))
    console.log("HOLA, ESTE ES EL DISPOSITIVO "+dispositivoId)
    console.log("Que tiene el dispositivo dentro ? "+ JSON.stringify(props.dispositivos[dispositivoId].addresses.ipv4))
    console.log("Aqui tenemos el hostname "+props.dispositivos[dispositivoId].hostnames[0]?.name)


  const getImagen = () => {
    return Object.keys(props.conocidos[0]).includes(props.dispositivos[dispositivoId].mac) ?
    props.conocidos[0][props.dispositivos[dispositivoId].mac]?.type.toString().toLowerCase()
    :
    "desconocido";
  }
  //console.log("AQUI TNEMOS GETIMAGEN1 "+ getImagen)
  console.log("AQUI TNEMOS GETIMAGEN2 "+ getImagen())

  function transformarDirMac (direccionMac) {
    return direccionMac.replace(/:/g,'');
  }


  const callServer = async (dir_ip) => {  
    console.log(CONFIG.server_url_ports + dir_ip)  
    if(USE_SERVER) {
      try {
        const response = await fetch(`${CONFIG.server_url_ports + dir_ip}`);
        const data = await response.json(); 
        console.log("hola aquí está data DE LOS PUERTOS") 
        console.log(data)  

        setPuertos(data);
        console.log("hola aquí están los puertos!!")
        console.log(puertos)
        

      } catch (error) {
        console.log(error);
        setPuertos({ error: {description: error.message} });
      }
    } else {
      setPuertos(datos_pruebas_todos);
      console.log(puertos)
    }
  }

  const guardar = () => {
        props.setLista(false)
        props.setListaConocidos(false)
        props.setFormulario(true);
        props.setformularioConocido(false);
        props.setListaDispositivo(false)
  }
  const modificar = () => {
    props.setFormulario(false);
    props.setformularioConocido(true);
    props.setListaDispositivo(false)
    props.setLista(false)
    props.setListaConocidos(false)
    console.log("Aqui tienes "+ dispositivos[dispositivoId].mac)
    props.setDispositivoId(dispositivos[dispositivoId].mac)
}
  const volver = () => {
    props.setLista(true)
    props.setListaConocidos(false)
    props.setListaDispositivo(false)
    props.setFormulario(false);
    props.setformularioConocido(false);
  }

    return (
        <div>
        { dispositivoId === -1 ? <div>
            <h1>No hay Información disponible de este dispositivo, ya que está desconectado</h1>
            <Button className="index" id="volver" onClick={() => volver()}>Volver</Button>
            </div>
             :
            <div>   
                <h3>Hola, aqui tienes Informaciónde este dispositivo {props.dispositivos[dispositivoId].hostnames[0]?.name}</h3>

                <img id="imagen_dispositivo" src={require(`./static/images/${getImagen()}.png`)}/>
                <div id="info_general">
                    <p id="titulo">Dirección IP:<b> {props.dispositivos[dispositivoId].addresses.ipv4}</b></p>
                    <p id="dir_mac">Dirección MAC <b>{props.dispositivos[dispositivoId].mac}</b></p>
                    <p id="hostname"> Nombre en la Red: <b>{props.dispositivos[dispositivoId].hostnames[0]?.name}</b></p>
                    {/*<p id="vendor">Vendedor: {Object.keys(props.dispositivos[dispositivoId].vendor).length === 0 ? "Vendedor desconocido" : dispositivos[dispositivoId].vendor}</p>*/}
                </div>

                {Object.keys(conocidos).includes(dispositivos[dispositivoId].mac) ? 
                <div id="conocido"> 
                    <div id="info_adicional">
                        <p id="tipo">El dispositivo se trata de un:<b>{conocidos[dispositivos[dispositivoId].mac]?.type}</b></p>
                        <p id="dueño">Pertenece a: <b>{conocidos[dispositivos[dispositivoId].mac]?.owner}</b></p>
                        <p id="localizacion">EL dispositivo se encuentra en <b>{conocidos[dispositivos[dispositivoId].mac]?.location}</b></p>
                    </div>
                    

                    <div className="botones_de_accion">
                    <Button className="index" onClick={() => volver()}>Volver</Button>
                    <Button className="btn btn-secondary" id="modificar" type="submit" onClick={() => modificar()}>Modificar</Button>
                    {/*<Link to={"/conocidos/modificar/"+ dispositivos[dispositivoId].mac}><Button className="btn btn-secondary" id="modificar" type="submit">Modificar Dispositivo</Button></Link>*/}
                    <form method="post" action={CONFIG.server_url_eliminar+transformarDirMac(dispositivos[dispositivoId].mac)}>
                        <Button className="btn btn-danger" id="borrar" type="submit">Borrar Dispositivo</Button>
                    </form>
                    <Button className="index" id="puertos" onClick={ () => callServer(dispositivos[dispositivoId].addresses.ipv4)}>Analizar</Button>
                    </div>
                    {puertos && <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                {console.log(puertos)}
                                <th scope="col">Puerto</th>
                                <th scope="col">Servicio</th>
                                <th scope="col">Estado</th>
                                </tr>
                            </thead>
                            {puertos.map((item,number) => (
                            <tbody>
                                <tr>
                                <td>{item.PORT}</td>
                                <td>{item.SERVICE}</td>
                                <td>{item.STATE}</td>
                                </tr>
                            </tbody>
                                            ))}
                            </table>

                                </div>

                    }
                </div>
                :
                <div className="botones_de_accion">
                <Button className="index" id="volver" onClick={() => volver()}>Volver</Button>
                <Button className="index" id="guardar" onClick={() => guardar()}>Guardar Dispositivo</Button>
                {/*<Link to={"/añade/"+ dispositivoId}><Button className="index" id="guardar">Guardar Dispositivo</Button></Link> */}

                </div>
                }
                
               {/*<Link to= "/calendario"><Button className="index" id="guardar">Calendario</Button></Link>*/}
               {/*<Calendario mac_address ={dispositivos[dispositivoId].mac}/>*/}
               <MapaCalor direccionMac ={dispositivos[dispositivoId].mac}/>
        </div>
            }
        </div>
    )
}