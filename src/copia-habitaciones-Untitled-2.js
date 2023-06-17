import Card from 'react-bootstrap/Card';
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import './habitaciones.css'
import Dispositivos_Habitaciones from './Dispositivos_Habitaciones';



export default function Habitaciones (props){

    /*Estancias
        -dormitorio principal
        -dormmitorio 1
        -dormitorio 2
        -despacho
        -salon
        -comedor
        -cocina
        -terraza
        -jardin
        -sotano
        -atico
        -otra estancia
    */
    
    //const [selector, setSelector] = useState (null);

    const [estancia, setEstancia] = useState (false);
    const [habitaciones2, setHabitaciones2] = useState (true);


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
        const dispositivos = datos_pruebas_todos;
        
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
          
        //const conocidos = props.conocidos;
        const conocidos = datos_pruebas_conocidos;
        //const direccionesMAC = props.direccionesMAC;
    
        //Esto lo hago para ver cuales son todas las habitaciones que hay
        const array0= Object.keys(conocidos).map((direccion, numero) => (conocidos[direccion]?.location));
        const array1 = array0.reduce(
                (previousValue,currentValue)=>{
                    if(!previousValue.includes(currentValue)){
                        return [...previousValue,currentValue];
                    }
                    return previousValue;
                },
            [],
            );
        console.log(array1);
        /*const filtrar = (filtro) =>{
            setSelector(filtro);
        }
        */

        function getImagen(item) {
            const imagen = item.toString().toLowerCase().replace(/\s/g, "_"); // Reemplaza espacios en blanco con guiones bajos
            return imagen;
          }
        
          const verDispositivos = (item) => {
            console.log(estancia); // Imprimir el valor actual de estancia
            setHabitaciones2(false);
            setEstancia(item); // Cambiar el valor de estancia después de actualizar props.setHabitaciones
          }
          
        function volver () {
            setEstancia(false);
            props.setHabitaciones(false)
            props.setLista(true);
            props.setListaConocidos(false);
            props.setListaDispositivo(false);
            props.setFormulario(false);
            props.setformularioConocido(false);
        }


          

    return(
        <div>
            {/*
                    <label for="filtro"> Filtrar </label>
                    <select id="selector" name="filtrado" onChange={e=>filtrar(e.target.value)}>
                        <option value="All">All</option>
                        {array1.map(item=> (
                        <option value={item}>{item}</option>
                        ))}
                    </select>
            */}
                    {habitaciones2 && <div><div id='habitaciones' className="card-grid">
                    {array1.map((item, number) => 
                    //console.log(`./static/images/${getImagen(item)}.png`)
                    (
                        <Card className="unproducto" key={number.toString()}>
                            <Card.Img
                            variant="top"
                            src={require(`./static/images/${getImagen(item)}.png`)}
                    />
                            <Card.Body>
                            <Card.Title>{item}</Card.Title>
                            {/*<Card.Text>{item.description}</Card.Text>*/}
                            <Button variant="primary" className="show"  onClick={() => verDispositivos(item)}>
                                Ver Dispositivos
                            </Button>
                            </Card.Body>
                        </Card>
                        ))}
            </div>
            <Button variant="primary" className="show" onClick={() => volver()}>
            Volver
            </Button>
            </div>}
                    {estancia && <div>
                        {console.log("HOLAAAA ESTANCIA"+estancia)}
                                    <Dispositivos_Habitaciones 
                                    estancia={estancia}
                                    setEstancia={setEstancia}
                                    conocidos = {conocidos}
                                    setHabitaciones = {setHabitaciones2}
                                    
                                    setLista = {props.setLista}
                                    setListaConocidos = {props.setListaConocidos}
                                    setListaDispositivo={props.setListaDispositivo}
                                    setFormulario={props.setFormulario}
                                    setformularioConocido = {props.setformularioConocido}
                                    
                                    />
                                 </div>

                    }
        
        </div>
        
    )
}