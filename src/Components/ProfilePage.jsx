import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Router, Link } from "@reach/router";

import Info from "./Home/Info"
import Contacto from "./Home/Contacto"
import Help from "./Home/Help"
import User from "./Home/User"

const ProfilePage = () => {

  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light"className="bg-green-300">
       
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">Empresa</a>
          </div>
          <ul className="nav navbar-nav">
            <li className="active"><Link to="/">Inicio</Link></li>
            <button className="btn btn-danger" onClick={() => { signOut() }}>
              Cerrar Sesion</button>
          </ul>
        </div>
      </nav>
      <Router>
        <Info exact path="info" />
        <Contacto exact path="contacto" />
        <Help exact path="help" />
        <User exact path="user" />
      </Router>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            

            
          </div>
        </div>
      </div>
          </div>
  )
};

export default ProfilePage;

