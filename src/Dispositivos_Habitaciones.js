
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
    //dispositivoId=props.dispositivoId;
    //setDispositivoId=props.setDispositivoId;
    //const [dispositivoId, setDispositivoId] = useState(null);
    //props.conocidos)
    const datosFiltrados = Object.keys(props.conocidos[0])
                             .filter((key) => {
                                console.log(props.conocidos[0][key].location)
                                return props.conocidos[0][key].location === props.estancia})
                            .reduce((nuevos_dispositivos, key) => {
                                    nuevos_dispositivos[key] = props.conocidos[0][key];
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
        const posicion = props.dispositivos.findIndex(item => item.mac === direccion_dispositivo)
        //const posicion = Object.keys(props.conocidos).findIndex((indice) => indice === direccion_dispositivo);
        console.log(posicion)
        props.setEstancia(false);
        props.setHabitaciones(false);
        //setListaDispositivo(true);
        props.setDispositivoId(posicion);
        props.setListaDispositivo(true);
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

        <Button variant="primary" className="show" onClick={() => volver()}>
        Volver
    </Button>
    </div>
    )
}