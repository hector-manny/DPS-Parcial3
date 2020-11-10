import React from "react";

import Application from "./Components/Application";
import UserProvider from "./providers/UserProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <UserProvider>
      <Application />
      <div className="footer bg-blue-500 p-6">
        <p>UDB Empresa &#169; Todos los Derechos reservados 2020</p>
        <ToastContainer />
      </div>
    </UserProvider>
    

  );
}

export default App;
