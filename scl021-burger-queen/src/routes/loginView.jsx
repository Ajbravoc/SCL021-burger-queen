import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useEffect } from "react";
import { auth, userExists } from "../firebase/firebase";

import { useNavigate } from "react-router-dom";

import style from "./loginView.module.css";
import burgerbackground from "./imgs/burgerbackground.png";

export default function LoginView() {
  async function handleOnClick() {
    const googleProvider = new GoogleAuthProvider();
    await signInWithGoogle(googleProvider);
  }
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          navigate("/order");
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

 

  //Está bien así?
  const logout = async () => {
    await signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        return error;
      });
  };

  return (
      <div className={style.borderExt}>
        <div className={style.mainContainer}>
          <img
            className={style.burgerBackground}
            src={burgerbackground}
            alt="burgerbackground.png"
          />
          <div className={style.loginView}></div>
          <div className={style.title}>
            <h1> Burger Queen</h1>
          </div>
          <div className={style.btnsLoginView}>
          <button className={style.btnGoogle} onClick={handleOnClick}>
            Continue with Google{" "}
          </button>
          <button className ={style.btnLogout} onClick={logout}>Crear cuenta</button>
          </div>
        </div>
      </div>
  );
}
