import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Link, useParams} from "react-router-dom";
import "./static/templates/formulario.css";
import Form from 'react-bootstrap/Form';
import $ from 'jquery';
import CONFIG from "./config/config";

export default function Formulaio_Conocidos(props){
    
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
const dispositivoId = props.dispositivoId;
//let { dispositivoId } = useParams();

const dispositivos = props.dipositivos;
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
//const dispositivos = datos_pruebas_todos;
const conocidos = props.conocidos[0];
//const conocidos = datos_pruebas_conocidos;
//console.log("Aqui tenemos la imagen "+conocidos[dispositivoId].type.toString().toLowerCase())
console.log("Aqui tienes la direccion MAC "+ props.dispositivoId)
console.log("Aqui tienes el tipo "+JSON.stringify(props.conocidos[0][dispositivoId].type))
console.log("Aqui tienes el owner "+JSON.stringify(props.conocidos[0][dispositivoId].owner))
console.log("Aqui tienes lla localizacion "+JSON.stringify(props.conocidos[0][dispositivoId].location))

const [selector, setSelector] = useState(conocidos[dispositivoId].type.toString().toLowerCase());
const [location,setLocation] = useState(conocidos[dispositivoId].location);
const [owner,setOwner] = useState(conocidos[dispositivoId].owner);
const [allowed,setAllowed] = useState(conocidos[dispositivoId].allowed);
useEffect(() => {
    document.getElementById("imagen_dispositivo").src = require(`./static/images/${selector}.png`);
}, [selector]);






const filtrar = (filtro) =>{
    setSelector(filtro)
}

const permitido = () =>{
    setAllowed(!allowed)
}
const dueño = () =>{
        setOwner(owner)
    }
const ubicacion = () =>{
    setLocation(location)
}

/*
const comprobarDueño = (dirMac) => {
    if (Object.keys(conocidos).includes(dirMac)){
        return conocidos[dirMac].owner;
    } else{
        return ""
    }

}

const comprobarLugar = (dirMac) => {
    if (Object.keys(conocidos).includes(dirMac)){
        return conocidos[dirMac].location;
    } else{
        return ""
    }

}
*/


//Para que me funcione el formulario y pueda realizar el method PUT
function handleFormSubmit(event) {
    event.preventDefault();
    const form = $(event.target);
    const url = form.attr('action');
  
    $.ajax({
      type: 'PUT',
      url: url,
      data: form.serialize(),
      success: function(data) {
        console.log('Datos actualizados con éxito:', data);
      },
      error: function(error) {
        console.error('Error al actualizar los datos:', error);
      }
    });
  }



const volver = () => {
    props.setLista(true)
    props.setListaConocidos(false)
    props.setListaDispositivo(false)
    props.setFormulario(false);
    props.setformularioConocido(false);
  }

return(
    <div>
            <h3>Hola, rellene el formulario para modificar el dispositivo</h3>
            {console.log(dispositivoId)}
   
        <div className='container'>
            <img id="imagen_dispositivo" src={require(`./static/images/${selector}.png`)}/>
        
            <Form action={CONFIG.server_url_update} method="PUT" onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tipo de dispositivo:</Form.Label>
                    <Form.Select name="device_type" onChange={e => filtrar(e.target.value)}>
                        <option value="desconocido">Desconocido</option>
                        <option value="altavoz">Altavoz</option>
                        <option value="aspiradora">Aspiradora</option>
                        <option value="consola">Consola</option>
                        <option value="impresora">Impresora</option>
                        <option value="movil">Móvil</option>
                        <option value="ordenador">Ordenador</option>
                        <option value="reloj">Reloj</option>
                        <option value="router">Router</option>
                        <option value="tablet">Tablet</option>
                        <option value="tv">TV</option>
                        <option value="otro">Otro</option>
                    </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Dirección MAC:</Form.Label>
                    <Form.Control type="text" name="mac_address" value={dispositivoId}  />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Propietario:</Form.Label>
                        {/*<Form.Control type="text" name="owner"/>*/}
                        <Form.Select name="owner" onChange={e => dueño(e.target.value)}>
                            <option value="Mama">Mama</option>
                            <option value="Hermano">Hermano</option>
                            <option value="Papa">Papa</option>
                            <option value="Yo">Yo</option>
                        </Form.Select>
                        </Form.Group>
                    

                        <Form.Group className="mb-3">
                        <Form.Label>Ubicación:</Form.Label>
                        {/*<Form.Control type="text" name="location" />*/}
                        <Form.Select name="location" onChange={e => ubicacion(e.target.value)}>
                            <option value="atico">Ático</option>
                            <option value="cocina">Cocina</option>
                            <option value="comedor">Comedor</option>
                            <option value="despacho">Despacho</option>
                            <option value="dormitorio_1">Dormitorio 1</option>
                            <option value="dormitorio_2">Dormitorio 2</option>
                            <option value="dormitorio_principal">Dormitorio Principal</option>
                            <option value="jardin">Jardin</option>
                            <option value="salon">Salón</option>
                            <option value="sotano">Sótano</option>
                            <option value="terraza">Terraza</option>
                            <option value="otra_estancia">Otra</option>
                        </Form.Select>
                        </Form.Group>
{/*
                    <Form.Group className="mb-3">
                    <Form.Check type="switch" name="allowed" label="¿Quieres permitir un escaneo exhaustivo?" value={allowed} onChange={permitido}/>
                    </Form.Group>
*/}
                    <Form.Group className="mb-3">
                    <Form.Label>¿Quiere permitir un escaneo exhaustivo?</Form.Label>
                    <Form.Select name="allowed" onChange={e => permitido(e.target.value)}>
                        <option value="true">Acepto</option>
                        <option value="false">Niego</option>

                    </Form.Select>
                    </Form.Group>

                    <Button variant="success" type="submit">Guardar modificación</Button>
                    <Button variant="danger" type="reset" >Resetear </Button>

                </Form>

         </div>
                    <Button onClick={() => volver()}>Volver Atrás</Button>

    </div>
)
}