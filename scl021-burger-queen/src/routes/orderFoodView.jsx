import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from "react";

import { auth} from "../firebase/firebase";

import { signOut } from "firebase/auth";

import style from "./orderFoodView.module.css";
import breakfast from "../menu/menu.json";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});

  function firebaseName (user) {
    //navigate ('/choose-username');
    setCurrentUser(user); //Setea el nombre de usuario loggeado
    setState(3);
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

  /* Insertar fecha pero no me deja :()
const fecha = document.getElementsByClassName("date");
function clock (){
  let now = new Date().toLocaleTimeString()
  const el = <span>{now}</span>;

  ReactDOM.render(el,fecha)
}
setInterval(clock, 1000 )*/

  if (state === 3) {
    return (
      <div className={style.borderExt}>
        <div className={style.mainContainer}>
          <nav>
            <h1> Welcome, {currentUser.displayName} </h1>
          </nav>
          <div className={style.tablesContainer}>
            <div class={style.col}>Table 01</div>
            <div class={style.col}>Table 02</div>
            <div class={style.col}>Table 03</div>
            <div class={style.col}>Table 04</div>
            <div class={style.col}>Table 05</div>
            <div class={style.col}>Table 06</div>
            <div class={style.date}>Date</div>
          </div>
          <div className={style.mainFoodContent}>
            <div className={style.mealBtns}>
              <button className={style.btnBreakfast} onClick>
                Breakfast
              </button>
              <button className={style.btnLunch} onClick>
                Lunch/Dinner
              </button>
            </div>
            <div className={style.typeOfMealsBtns}>
              <button className={style.btnDrinks} onClick>
                Drinks
              </button>
              <button className={style.btnSandwiches} onClick>
                Sandwiches
              </button>
            </div>
            <div className={style.mainMenuContent}>
              <div className={style.menuContainer}> </div>
              <div className={style.receipt}>
                <div className={style.receiptTitle}>
                  <h1> Receipt</h1>
                </div>
              </div>
            </div>
            <button className ={style.btnLogout} onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider onUserNotRegistered={firebaseName}/*Componente*/>
     
   
    </AuthProvider>
  );
}


