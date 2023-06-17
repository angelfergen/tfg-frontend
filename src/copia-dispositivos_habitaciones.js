
import Card from 'react-bootstrap/Card';
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import './habitaciones.css'
import Dispositivo from './Dipositivo';


export default function Dispositivos_Habitaciones(props){
    //props.conocidos
    //props.setEstancia
    //props.estancia
    //props.setHabitaciones

    const [dispositivoId, setDispositivoId] = useState(null);
    const datosFiltrados = Object.keys(props.conocidos)
                             .filter((key) => props.conocidos[key].location === props.estancia)
                            .reduce((nuevos_dispositivos, key) => {
                                    nuevos_dispositivos[key] = props.conocidos[key];
                        return nuevos_dispositivos;
  }, {});

    console.log(datosFiltrados);
    
    function getImagen(item) {
        return item.toString().toLowerCase()
        
    }

    function volver () {
        props.setEstancia(false);
        props.setHabitaciones(true)
    }

    const verDispositivo = (direccion_dispositivo) =>{
        const posicion = Object.keys(props.conocidos).findIndex((indice) => indice === direccion_dispositivo);
        console.log(posicion)
        props.setEstancia(false);
        props.setHabitaciones(false);
        //setListaDispositivo(true);
        setDispositivoId(posicion);
        }

    return(
        <div>
        <div className="card-grid">
            {Object.keys(datosFiltrados).map((direccion, numero) => 
                                //console.log(`./static/images/${getImagen(item)}.png`)
                                //datosFiltrados[direccion]?.type
                                (
                                    <Card className="unproducto" key={numero.toString()}>
                                        <Card.Img
                                        variant="top"
                                        src={require(`./static/images/${getImagen(datosFiltrados[direccion]?.type)}.png`)}
                                />
                                        <Card.Body>
                                        <Card.Title>Dueño {datosFiltrados[direccion]?.owner}</Card.Title>
                                        <Card.Text>{datosFiltrados[direccion]?.type}</Card.Text>
                                        <Button variant="primary" className="show" onClick={() => verDispositivo(direccion)}>
                                            Ver Dispositivo
                                        </Button>
                                        </Card.Body>
                                    </Card>
            ))}
        </div>
        {dispositivoId && <div id="dispositivo">
                            <Dispositivo numero = {dispositivoId}
                                        setLista = {props.setLista}
                                        setListaConocidos = {props.setListaConocidos}
                                        setListaDispositivo={props.setListaDispositivo}
                                        setFormulario={props.setFormulario}
                                        setformularioConocido = {props.setformularioConocido}
                            />
                            </div>
                                }

        <Button variant="primary" className="show" onClick={() => volver()}>
        Volver
    </Button>
    </div>
    )
}