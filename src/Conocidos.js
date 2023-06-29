
import "./static/templates/conocidos.css";
import { useState } from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom";
import CONFIG from "./config/config";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from "react-bootstrap";


export default function Conocidos (props) {

    const [loading,setLoading]= useState(true);
    const [selector, setSelector] = useState (null);
    const [selectConocidos, setSelectConocidos] =useState(null);

    const dispositivos = props.dipositivos;
    const conocidos = props.conocidos;
    const direccionesMAC = props.direccionesMAC;

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
            "owner": "Papa",
            "location": "casa",
            "allowed": "True"
        },
        "18:60:24:33:42:fa": {
            "type": "Impresora",
            "owner": "Yo",
            "location": "casa",
            "allowed": "True"
        },
        "00:00:00:00": {
            "type": "blabla",
            "owner": "Mama",
            "location": "bellodrama",
            "allowed": "true"
        }
    }
    
    //const conocidos = datos_pruebas_conocidos;
  
    useEffect(() => {
      if (loading) {
        setTimeout(() => {
        setLoading(false);
      }, 4000);
      }
    }, [loading]);

    function transformarDirMac (direccionMac) {
        return direccionMac.replace(/:/g,'');
      }

    function filtrar(valor) {
        setSelector(valor); // Esta línea la uso para actualizar el valor seleccionado
        
        let dispositivosFiltrados = [];
      
        if (valor === "All") {
          setSelectConocidos(false)

        } else if(valor === "Papa"){
            dispositivosFiltrados = Object.entries(datos_pruebas_conocidos)
            .filter(([_, dispositivo]) => dispositivo.owner.toLowerCase() === valor.toLowerCase())
            .map(([direccionMac, dispositivo]) => ({ direccionMac, ...dispositivo }));
            props.setConocidos(false)

        } else if(valor === "Mama"){
            dispositivosFiltrados = Object.entries(datos_pruebas_conocidos)
            .filter(([_, dispositivo]) => dispositivo.owner.toLowerCase() === valor.toLowerCase())
            .map(([direccionMac, dispositivo]) => ({ direccionMac, ...dispositivo }));

        } else if(valor === "Hermano"){
            dispositivosFiltrados = Object.entries(datos_pruebas_conocidos)
            .filter(([_, dispositivo]) => dispositivo.owner.toLowerCase() === valor.toLowerCase())
            .map(([direccionMac, dispositivo]) => ({ direccionMac, ...dispositivo }));

        } else if(valor === "Yo"){
            dispositivosFiltrados = Object.entries(datos_pruebas_conocidos)
            .filter(([_, dispositivo]) => dispositivo.owner.toLowerCase() === valor.toLowerCase())
            .map(([direccionMac, dispositivo]) => ({ direccionMac, ...dispositivo }));

        }
        else {
          dispositivosFiltrados = Object.entries(datos_pruebas_conocidos)
            .filter(([_, dispositivo]) => dispositivo.type.toLowerCase() === valor.toLowerCase())
            .map(([direccionMac, dispositivo]) => ({ direccionMac, ...dispositivo }));

        }
        setSelectConocidos(dispositivosFiltrados)
      }
      
    const volver = () => {
    props.setLista(true)
    props.setListaConocidos(false)
    props.setListaDispositivo(false)
    props.setFormulario(false);
    props.setformularioConocido(false);
    }

    const modificar = (direccion) => {
    props.setFormulario(false);
    props.setformularioConocido(true);
    props.setListaDispositivo(false)
    props.setLista(false)
    props.setListaConocidos(false)
    props.setDispositivoId(direccion)
}
      
    return(

        <div className="App">
            <header className="App-header">
            {loading ? (<div class="spinner-cajita">
                    <div class="spinner-border" role="status">
                    </div>
                    <div class="spinner-texto">Analizando los dispositivos Conocidos</div>
                  </div> ) : ( conocidos &&
        <div>
                <h3 id="cabecera_todos">Estos son los dispositivos conocidos </h3>
                
                {conocidos.map((objeto, index) => {
                    for (const direccionMAC in objeto) {
                        const informacion = objeto[direccionMAC];
                        //console.log('Elemento:', index);
                        //console.log('Dirección MAC:', direccionMAC);
                        //console.log('Información:', informacion);
                        //console.log('Tipo:', informacion.type);
                        //console.log('Dueño:', informacion.owner);
                        //console.log('Location:', informacion.location);

                    }
                })}

                <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Direccion Mac</th>
                    <th scope="col">Nombre del tipo</th>
                    <th scope="col">Dueño</th>
                    <th scope="col">Localización</th>  
                    <th scope="col">Borrar dispositivo</th>              
                </tr>
                </thead>
                <tbody>
                {conocidos.map((objeto, index) => {
                    return Object.entries(objeto).map(([direccionMAC, informacion]) => (
                    <tr key={direccionMAC}>
                        <th scope="row">{index}</th>
                        <td>{direccionMAC}</td>
                        <td>{informacion.type}</td>
                        <td>{informacion.owner}</td>
                        <td>{informacion.location}</td>
                        <td>
                        <Button className="btn btn-secondary" id="modificar" type="submit" onClick={() => modificar(direccionMAC)}>Modificar Dispositivo</Button>
                        </td>
                        <td>
                        <form method="post" action={CONFIG.server_url_eliminar + transformarDirMac(direccionMAC)}>
                            {/*console.log(CONFIG.server_url_eliminar + transformarDirMac(direccionMAC))*/}
                            <Button className="btn btn-danger" id="borrar" type="submit">Borrar Dispositivo</Button>
                        </form>
                        </td>
                    </tr>
                    ));
                })}
                </tbody>
                </table>
                <Button onClick={() => volver()}>Volver Atrás</Button>
                </div>
                )}
            </header>

            {selectConocidos && <div>
                <h4>Aqui tienes los dispositivos filtrados</h4>
                <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Direccion Mac</th>
                    <th scope="col">Nombre del tipo</th>
                    <th scope="col">Dueño</th>
                    <th scope="col">Localización</th>  
                    <th scope="col">Borrar dispositivo</th>              
                </tr>
                </thead>
                    { 
                    selectConocidos.map((item, numero) => 
                    
                    (

                    <tbody>

                        <tr>
                            <th scope="row">{numero}</th>
                            <td>{item.direccionMac}</td>
                            <td>{item?.type}</td>
                            <td>{item?.owner}</td>
                            <td>{item?.location}</td>
                            <td>
                            <Button className="btn btn-secondary" id="modificar" type="submit" onClick={() => modificar()}>Modificar Dispositivo</Button>

                            </td>
                            <td>
                            <form method="post" action={CONFIG.server_url_eliminar+transformarDirMac(item.direccionMac)}>
                                        <Button className="btn btn-danger" id="borrar" type="submit">Borrar Dispositivo</Button>
                            </form>
                            </td>

                        </tr>
                    </tbody>
                    ))
                    
                    }
                    </table>
                
                </div>}
                <div id="dispositivosFiltrados"></div>

        </div>
    )
}