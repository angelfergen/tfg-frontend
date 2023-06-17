import {Routes,  Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Lista from "./Lista";
import Formulario_Conocidos from "./Formulario_Conocidos";
import Login from './Login';
import Dispositivo from "./Dipositivo";
import Conocidos from "./Conocidos";




import { useState } from 'react';
import { useEffect } from 'react';
import CONFIG from "./config/config";

import 'bootstrap/dist/css/bootstrap.min.css';
import Formulario from "./Formulario";
import Calendario from "./Calendario";


function App() {
  const [dispositivos, setDispositivos]=useState()
  const [conocidos, setConocidos]=useState()
  const [direccionesMac, setDireccionesMac] = useState ();
  //const [loading,setLoading]= useState(true);
  const USE_SERVER = CONFIG.use_server;

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

  const callServer = async () => {    
    if(USE_SERVER) {
      try {
        const response = await fetch(`${CONFIG.server_url_ari}`);
        const data = await response.json(); 
        console.log("hola aquí está data") 
        //console.log(data)  
        //console.log(data[0].addresses.ipv4) //Así consigo la direccion ip
        //console.log(data[0].hostnames[0].name) //Así consigo el hostname
        //console.log(data[0].mac) //Así consigo la direccion mac
        //console.log(data[0].vendor) //Así consigo el vendedor
        //console.log(Object.keys(data[0].vendor).length === 0 ? "Vendedor desconocido" : "Vendedor conocido")

        setDispositivos(data);
        //console.log("hola aquí está resultado")
        //console.log("hola aquí está resultado")
        //console.log(dispositivos)

      } catch (error) {
        console.log(error);
        setDispositivos({ error: {description: error.message} });
      }
    } else {
      setDispositivos(datos_pruebas_todos);
      //console.log(dispositivos)
    }
  }
  const callServer_conocidos = async () => {    
    if(USE_SERVER) {
      try {
        const response = await fetch(`${CONFIG.server_url_conocidos}`);
        const data = await response.json(); 
        //console.log("hola aquí está data2") 
        //console.log(data[0])
        //console.log(data[0]["94:6a:b0:5c:3b:29"])
        //console.log(data[0]["94:6a:b0:5c:3b:29"].type) 
        //console.log(data[0]["94:6a:b0:5c:3b:29"].owner) 
        //console.log(data[0]["94:6a:b0:5c:3b:29"].location)
        //console.log(data[0]["94:6a:b0:5c:3b:29"].allowed)    
        
        setConocidos(data);
        //console.log("hola aquí está conocidos")
        //console.log(conocidos)
        
        /*
        const direccionesMAC = Object.keys(data[0]);
        console.log("Hola, direcciones macs de dispositivos conocidos")
        console.log(direccionesMAC); // ["94:6a:b0:5c:3b:29", "18:60:24:33:42:fa", "00:00:00:00"]
        */
        
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
      /*console.log("Hola, direcciones macs de dispositivos conocidos")
      console.log(direccionesMAC); // ["94:6a:b0:5c:3b:29", "18:60:24:33:42:fa", "00:00:00:00"]
      console.log(conocidos[direccionesMAC[0]].type)  //de esta manera estoy leyendo los atributos
      console.log(conocidos[direccionesMAC[0]].owner) //de esta manera estoy leyendo los atributos
      console.log(conocidos[direccionesMAC[0]].location) //de esta manera estoy leyendo los atributos
      console.log(conocidos[direccionesMAC[0]].allowed) //de esta manera estoy leyendo los atributos
      */
      /*
      for (let i = 0; i<direccionesMAC.length; i++){
        console.log("HOLA AMORES")
        console.log(datos_pruebas_conocidos[direccionesMAC[i]].type)
        console.log(datos_pruebas_conocidos[direccionesMAC[i]].owner)
        console.log(datos_pruebas_conocidos[direccionesMAC[i]].location)
        console.log(datos_pruebas_conocidos[direccionesMAC[i]].allowed)

      }
      */

    }
  }

  useEffect(() =>{
    callServer();
    console.log("hola aquí está resultado")
    console.log(dispositivos)
  }, []);
  useEffect(() =>{
    callServer_conocidos();
    console.log("hola aquí están resultados conocidos")
    console.log(conocidos)
  }, []);


  return (
    <div className="App">
        <Routes>
            <Route exact path="/" element={<Login />}/>
            <Route exact path="/lista" element={<Lista dispositivos={dispositivos} conocidos={conocidos} direccionesMac={direccionesMac}/>}/>

      </Routes>  
  </div>
  );
}

export default App;
