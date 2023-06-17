import { CNavbar, CNavbarBrand, CNavbarNav, CNavbarToggler, CContainer, CCollapse, CNavLink, CButton, CForm } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './navbar.css'

export default function Navbar (props){
    const [visible, setVisible] = useState(false)
    const navigate = useNavigate();
    //props.lista
    //props.listaConocidos
    //props.listaDispositivo
    //props.setHabitaciones
    //props.setVistaCalendario

    const pageHome = () => {
        props.setLista(true);
        props.setListaConocidos(false);
        props.setListaDispositivo(false);
        props.setHabitaciones(false);
        props.setFormulario(false)
        props.setformularioConocido(false)
        props.setVistaCalendario(false)

    };
    const pageConocidos = () => {
        props.setLista(false);
        props.setListaConocidos(true);
        props.setListaDispositivo(false);
        props.setHabitaciones(false);
        props.setFormulario(false)
        props.setformularioConocido(false)
        props.setVistaCalendario(false)


    };
    const pageCalendario = () => {
        props.setLista(false);
        props.setListaConocidos(false);
        props.setListaDispositivo(false);
        props.setHabitaciones(false);
        props.setFormulario(false)
        props.setformularioConocido(false)
        props.setVistaCalendario(true)

    };
    const pageHabitaciones = () => {
        props.setLista(false);
        props.setListaConocidos(false);
        props.setListaDispositivo(false);
        props.setHabitaciones(true);
        props.setFormulario(false)
        props.setformularioConocido(false)
        props.setVistaCalendario(false)

    };
    const cerrarSesion = () =>{
      navigate("/")
    }

    return (
        <>
          <CNavbar expand="lg" colorScheme="light" className="bg-light">
            <CContainer fluid>
              <CNavbarBrand><img id="logo" src={require("./static/images/logo.png")}/></CNavbarBrand>
              <CNavbarToggler
                aria-label="Toggle navigation"
                aria-expanded={visible}
                onClick={() => setVisible(!visible)}
              />
              <CCollapse className="navbar-collapse" visible={visible}>
                <CNavbarNav component="nav">
                  <CNavLink onClick={() => pageHome()} active>
                    Home
                  </CNavLink>
                  <CNavLink onClick={() => pageConocidos()} >Conocidos</CNavLink>
                  <CNavLink onClick={() => pageHabitaciones()}>Habitaciones</CNavLink>
                  <CNavLink onClick={() => pageCalendario()}>Calendario</CNavLink>
                  
                  <CForm className="d-flex">
                    <CButton type="submit" color="danger" variant="outline" onClick={cerrarSesion}>
                    Logout
                    </CButton>
                </CForm>
                </CNavbarNav>
              </CCollapse>
            </CContainer>
          </CNavbar>
        </>
      )
}
