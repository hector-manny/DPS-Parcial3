import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";

const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);


  const signInWithEmailAndPasswordHandler = (event) => {

    event.preventDefault(); //DOM -> POST , GET -> PHP , JAVA , ASP , ETC
   
    console.log(" SignIn - signInWithEmailAndPasswordHandler ");
    const user= auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error, por favor revisar credenciales -> " + error);
        console.error("Error signing in with password and email ", error);
      });
      console.log(" SignIn - signInWithEmailAndPassword ");  
      console.log(" const user :  " + user);      
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === 'userEmail') {
      setEmail(value);
    }
    else if (name === 'userPassword') {
      setPassword(value);
    }
  };


  return (
    <div className="">
      <nav className="flex items-center justify-between flex-wrap bg-blue-500 p-6">
        <ul className="nav navbar-nav">
        </ul>
      </nav>
      <br/>
      <br/>
      <br/>
      <div className="mt-8">
       
        <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
          <form>
            {error !== null && (
              <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
                {error}
              </div>
            )}
            <div className="form-group">
             <label>Login</label>
             <br/>
              <br/>
              <label>Correo Electronico</label>
              <input type="email" className="form-control"
                name="userEmail"
                placeholder="Ingresar email"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control"
                name="userPassword"
                placeholder="Ingresar password"
                onChange={(event) => onChangeHandler(event)} />
            </div>

            <button type="submit" className="btn btn-info btn-block"
              onClick={(event) => { signInWithEmailAndPasswordHandler(event) }}
            ><i className="fa fa-lock"></i>  Ingresar</button>
          </form>
          <button className="btn btn-danger btn-block"
            onClick={() => { signInWithGoogle(); }}
          ><i className="fa fa-google"></i>  Ingresar con Google
          </button>
          <p className="text-center my-3">
              {" "}
              <label>No tienes una cuenta?</label> <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                 Crea una
          </Link>{" "}
              <br />{" "}
              <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
                Olvido la contraseña?
          </Link>
            </p>
        </div>   
      </div>
    </div>

  );
};

export default SignIn;
