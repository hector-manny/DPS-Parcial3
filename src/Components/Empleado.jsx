import React, { useEffect, useState,useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import EmpleadosForm from "./EmpleadosForm";
import { Router, Link } from "@reach/router";
import { db } from "../firebase.js";
import { toast } from "react-toastify";

const Empleados = () => {
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();  
  };
  const [Empleados, setEmpleados] = useState([]);
  const [currentId, setCurrentId] = useState("");

  const getEmpleados = async () => {
    db.collection("Empleados").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setEmpleados(docs);
    });
  };

  const onDeleteEmpleado = async (id) => {
    if (window.confirm("Seguro de eliminar empleado?")) {
      await db.collection("Empleados").doc(id).delete();
      toast("Se elimino un Empleado", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  const addOrEditEmpleado = async (EmpleadoObject) => {
    try {
      if (currentId === "") {
        await db.collection("Empleados").doc().set(EmpleadoObject);
        toast("Se agrego un Empleado", {
          type: "success",
        });
      } else {
        await db.collection("Empleados").doc(currentId).update(EmpleadoObject);
        toast("Se actualizo un Empleado", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    
     <div>
     <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-10">
  <div class="flex items-center flex-shrink-0 text-white mr-8">
    <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
    <span class="font-semibold text-3xl tracking-tight">Empresa UDB</span>
  </div>
  <div class="block lg:hidden">
    <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
      <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    <div class="text-md lg:flex-grow">
     <a class="block mt-8 lg:inline-block lg:mt-0 text-white-200 hover:text-white lg-8">
    <Link to="/">Inicio</Link> 
      </a>
    </div>
    <div>
      <button class="inline-block text-md px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 lg:mt-0" onClick={() => { signOut() }}>Cerrar sesion</button>
    </div>
  </div>
</nav>
<br/>
<br/>
<br/>
      
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            
          <div className="col-md-4 p-2">
        <EmpleadosForm {...{ addOrEditEmpleado, currentId, Empleados }} />
      </div>

      <div className="col-md-8 p-2">
        <div class="container">
          <h1><strong>Lista Empleados</strong></h1>
          <br/>
          <br/>
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Nombre Empleado:</th>
                <th>Horas:</th>
                <th>Sueldo Base $:</th>
                <th>Sueldo ISSS $:</th>
                <th>Sueldo AFP $:</th>
                <th>Sueldo RENTA $:</th>
                <th>Sueldo Neto $:</th>
                <th>Aciones</th>
              </tr>
            </thead> 
            <tbody>
              {Empleados.map((Empleado) => (
                <tr key={Empleado.id}>
                  <td>{Empleado.nombre}</td>
                  <td>{Empleado.horas}</td>
                  <td>{Empleado.sueldoB}</td>
                  <td>{Empleado.ISSS}</td>
                  <td>{Empleado.AFP}</td>
                  <td>{Empleado.RENTA}</td>
                  <td>{Empleado.sueldoN}</td>
                  <td>
                    <button className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full" onClick={() => setCurrentId(Empleado.id)}>Editar</button>
                    &nbsp;
                    &nbsp;
                    <br/>
                    <button className="bg-red-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full" onClick={() => onDeleteEmpleado(Empleado.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
            
          </div>
        </div>
      </div>
          </div>
     
    </>
  );
};

export default Empleados;

