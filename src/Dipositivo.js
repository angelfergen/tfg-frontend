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

  let dispositivosFiltrados = null;
    if (dispositivoId !== -1) {
       dispositivosFiltrados = Object.keys(props.conocidos[0]).includes(props.dispositivos[dispositivoId].mac)
    ? props.conocidos[0][props.dispositivos[dispositivoId].mac]
    : null;
    }
    

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
    props.setDispositivoId(props.dispositivos[dispositivoId].mac)
    props.setformularioConocido(true);
    props.setListaDispositivo(false)
    props.setLista(false)
    props.setListaConocidos(false)
    console.log("Aqui tienes la mac que se va a modificar "+ props.dispositivos[dispositivoId].mac)
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
      {console.log("TODO CORRECTO")}
      { dispositivoId === -1 ? <div>
            <p id="titulo">No hay Información disponible de este dispositivo, ya que está desconectado</p>
            <Button className="index" id="volver" onClick={() => volver()}>Volver</Button>
            </div>
             :
      props.dispositivos && (
        <div>
          <h3>Hola, aquí tienes información de este dispositivo {props.dispositivos[dispositivoId].hostnames[0]?.name}</h3>
          <img id="imagen_dispositivo" src={require(`./static/images/${getImagen()}.png`)} />
          <div id="info_general">
            <p id="titulo">Dirección IP:<b>{props.dispositivos[dispositivoId].addresses.ipv4}</b></p>
            <p id="dir_mac">Dirección MAC <b> {props.dispositivos[dispositivoId].mac}</b></p>
            <p id="hostname"> Nombre en la Red: <b>{props.dispositivos[dispositivoId].hostnames[0]?.name}</b></p>
            <p id="vendor">Vendedor: <b>{props.dispositivos[dispositivoId].vendor}</b></p>
          </div>
          {dispositivosFiltrados ? (
            <div id="conocido">
              <div id="info_adicional">
              <p>Dueño: {dispositivosFiltrados.owner}</p>
              <p>Ubicación: {dispositivosFiltrados.location}</p>
              <p>Tipo: {dispositivosFiltrados.type}</p>
              </div>

              <div className="botones_de_accion">
                    <Button className="index" onClick={() => volver()}>Volver</Button>
                    <Button className="btn btn-secondary" id="modificar" type="submit" onClick={() => modificar()}>Modificar</Button>
                    {/*<Link to={"/conocidos/modificar/"+ dispositivos[dispositivoId].mac}><Button className="btn btn-secondary" id="modificar" type="submit">Modificar Dispositivo</Button></Link>*/}

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
