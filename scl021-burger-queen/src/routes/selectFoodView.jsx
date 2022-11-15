import { matchPath, useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth, exitsUsername, updateUser } from "../firebase/firebase";
import {
 
  signOut,
} from "firebase/auth";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  function handleUserLoggedIn(user) {
    navigate("/select");
  }

  function handleUserNotRegistered(user) {
    //navigate ('/choose-username');
    setCurrentUser(user);
    setState(3);
  }

  function handleUserNotLoggedIn() {
    navigate("/");
  }

  function handleInputUsername(e) {
    setUsername(e.target.value);
  }


  async function handleContinue() {
    if (username !== "") {
      const exists = await exitsUsername(username);
      if (exists) {
        setState(5);
      } else {
        const tmp = { ...currentUser };
        tmp.username = username;
        tmp.processCompleted = true;
        await updateUser(tmp);
        setState(6);
      }
    }
  }
//Está bien así?
  const logout = async () => {
    await signOut(auth)
    .then(() => {
        navigate('/');
    })
    .catch((error) => {
        return error;
    });
  };


  if (state === 3 || state === 5) {
    return (
      <div>
        <h1> Bienvenido {currentUser.displayName} ¿Desayuno o Almuerzo? </h1>
        <p> Para terminar to2, elige un nombre de usuario</p>
        {state === 5 ? <p>el nombre de usuario ya existe, elije otro</p> : ""}
        <div>
          <input type="text" onInput={handleInputUsername} />
        </div>

        <div>
          <button onClick={handleContinue}> Continuar </button>
       <button onClick={logout}>Logout</button>
        </div>
      </div>
    );
  }

  
if (state === 6 ) {
    return ( 
    <div>
        <h1> ya puedes pedir </h1>
        <Link to= "/select"> Continuaaar </Link>
    </div>
    );
}




  return (
    <AuthProvider /*Componente*/
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}>
    </AuthProvider>
  );
}
