import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";

import style from "./loginView.module.css";
import burgerbackground from './imgs/burgerbackground.png';


export default function LoginView() {
  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  }
  const navigate = useNavigate();

  /*const [currentUser, setCurrentUser] = useState(null);*/
  const [state, setCurrentState] = useState(0);
  /*State
0: Inicializado
1: Loading
2: login completo
3: Login pero sin registro
4: No hay nadie logueado
5: Ya existe el username
6: Nuevo username, click para continuar*/

  useEffect(() => {
    setCurrentState(1);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          //TODO: redirigir a Dashboard
          navigate("/order");
          setCurrentState(2);
        } else {
          //TODO: redirigir a choose username
          navigate("/select");
          setCurrentState(3);
        }
      }
    });
  }, [navigate]);

  async function signInWithGoogle(googleProvider) {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  }

  function handleUserLoggedIn(user) {
    navigate("/select");
  }


  function handleUserNotLoggedIn() {
    setCurrentState(4);
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


  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      //onUserNotRegistered={handleUserNotRegistered}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      logout
    >
      <div className={style.borderExt}>
    <div className={style.mainContainer}>
    <img className={style.burgerBackground} src ={burgerbackground} alt="burgerbackground.png"/>
      <div className={style.loginView}>
      </div>
        <div className={style.title}>
        <h1> Burger Queen</h1>
      </div>
        <button className={style.btnGoogle} onClick={handleOnClick}>Login with Google </button>
        <button onClick={logout}>Logout</button>
      </div>
      </div>
    </AuthProvider>
  );
}
