import "./static/templates/dispositivo.css";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import CONFIG from "./config/config";
import { useState } from "react";
import MapaCalor from "./MapaCalor";

export default function Dispositivo(props) {
  const dispositivoId = props.numero;

  const [puertos, setPuertos] = useState();

  const USE_SERVER = CONFIG.use_server;
  /*
  const datos_pruebas_conocidos = {
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
  */


  const dispositivosFiltrados = Object.keys(props.conocidos[0]).includes(props.dispositivos[dispositivoId].mac)
    ? props.conocidos[0][props.dispositivos[dispositivoId].mac]
    : null;

  const getImagen = () => {
    return dispositivosFiltrados ? dispositivosFiltrados.type.toLowerCase() : "desconocido";
  }

  function transformarDirMac (direccionMac) {
    return direccionMac.replace(/:/g,'');
  }


  const callServer = async (dir_ip) => {  
    console.log(CONFIG.server_url_ports + dir_ip)  
    if(USE_SERVER) {
      try {
        const response = await fetch(`${CONFIG.server_url_ports + dir_ip}`);
        const data = await response.json(); 
        //console.log("hola aquí está data DE LOS PUERTOS") 
        //console.log(data)  

        setPuertos(data);
        //console.log("hola aquí están los puertos!!")
        //console.log(puertos)
        

      } catch (error) {
        console.log(error);
        setPuertos({ error: {description: error.message} });
      }
    } else {
      setPuertos(props.conocidos[0]);
      //console.log(puertos)
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
    console.log("Aqui tienes "+ props.dispositivos[dispositivoId].mac)
    props.setDispositivoId(props.dispositivos[dispositivoId].mac)
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
      {props.dispositivos && (
        <div>
          <h3>Hola, aquí tienes información de este dispositivo {props.dispositivos[dispositivoId].hostnames[0]?.name}</h3>
          <img id="imagen_dispositivo" src={require(`./static/images/${getImagen()}.png`)} />
          <h5>La dirección IP {props.dispositivos[dispositivoId].addresses.ipv4}</h5>
          <h5>La dirección MAC {props.dispositivos[dispositivoId].mac}</h5>
          <h5>El vendedor {props.dispositivos[dispositivoId].vendor}</h5>
          <h5>El nombre en la red {props.dispositivos[dispositivoId].hostnames[0]?.name}</h5>
          <h5>El tipo de dispositivo {getImagen()}</h5>
          {dispositivosFiltrados ? (
            <div id="conocido">
              <p>Owner: {dispositivosFiltrados.owner}</p>
              <p>Location: {dispositivosFiltrados.location}</p>
              <p>Allowed: {dispositivosFiltrados.allowed}</p>
              <p>Type: {dispositivosFiltrados.type}</p>

              <div className="botones_de_accion">
                    <Button className="index" onClick={() => volver()}>Volver</Button>
                    <Button className="btn btn-secondary" id="modificar" type="submit" onClick={() => modificar()}>Modificar</Button>
                    <form method="post" action={CONFIG.server_url_eliminar+transformarDirMac(props.dispositivos[dispositivoId].mac)}>
                        <Button className="btn btn-danger" id="borrar" type="submit">Borrar Dispositivo</Button>
                    </form>
                    <Button className="index" id="puertos" onClick={ () => callServer(props.dispositivos[dispositivoId].addresses.ipv4)}>Analizar</Button>
                    </div>
                    {puertos && <div>
                        <table class="table table-striped">
                            <thead>
                                <tr>
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
          ) :           <div>      
          <Button className="index" id="volver" onClick={() => volver()}>Volver</Button>
          <Button className="index" id="guardar" onClick={() => guardar()}>Guardar Dispositivo</Button>
          </div> 
          }
          <MapaCalor direccionMac={props.dispositivos[dispositivoId].mac} />
        </div>
      )}
    </div>
  )
}
