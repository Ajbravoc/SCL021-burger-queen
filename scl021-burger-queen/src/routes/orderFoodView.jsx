import { useNavigate } from "react-router-dom";
import AuthProvider from "../components/authProvider";
import { useState } from "react";

import { auth } from "../firebase/firebase";

import { signOut } from "firebase/auth";

import style from "./orderFoodView.module.css";
import menu from "../menu/menu.json";

export default function ChooseUsernameView() {
  const navigate = useNavigate();
  const [state, setState] = useState(1);
  const [currentUser, setCurrentUser] = useState({});
  {
    /*}el valor de categoria es null*/
  }
  const [categoria, setCategoria] = useState("drink");
  const [order, setOrder] = useState([]);

  {
    /*} creo un state nuevo, paso jugo como objeto, y usando map en el receipt . Vuelve a dibujar todo el componente con la info actualizada. order inicia, setorder , usestate*/
  }
  function firebaseName(user) {
    //navigate ('/choose-username');
    setCurrentUser(user); //Setea el nombre de usuario loggeado
  }
  console.log(menu);

  const handleClick = () => {
    console.log("button clicked");
  };

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

  return (
    <>
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
              {/*}Con null desaparece la info en el contenedor*/}
              <button
                onClick={() => {
                  setState(1);
                }}
                className={style.btnBreakfast}
              >
                Breakfast
              </button>

              {/*}Aquí empieza todo xd*/}
              <button
                onClick={() => {
                  setState(2);
                }}
                className={style.btnLunch}
              >
                Lunch/Dinner
              </button>
            </div>
            {/*}Hace aparecer el json con tipo drink*/}
            <div className={style.typeOfMealsBtns}>
              <button
                onClick={() => {
                  setCategoria("drink");
                }}
                className={style.btnDrinks}
              >
                Drinks
              </button>

              {/*}Hace aparecer el json con tipo food*/}
              <button
                onClick={() => {
                  setCategoria("food");
                }}
                className={style.btnSandwiches}
              >
                Sandwiches
              </button>
            </div>

            {/*}Si la categoria es = al nombre del json*/}
            {categoria === "breakfast" ? <>items breakfast </> : null}
            {categoria === "lunch" ? <>items lunch </> : null}

            <div className={style.mainMenuContent}>
              <div className={style.menuContainer}>
                <div className={style.holaContainer}>
                  {/*Le puse un onclick aL STATE 1*/}
                  {state === 1 &&
                    menu.breakfast
                      .filter((item) => item.type === categoria)
                      .map((item, indice) => (
                        <button
                          onClick={() => {
                            setOrder([...order, item]);
                          }}
                          className={style.foodPicsBreakContainer}
                        >
                          <p key={indice}>
                            {item.name} 
                            <br />
                            <br />

                            <img src={item.image} alt="foto.png" />

                            <div className={style.price}> {item.price}</div></p>
                         
                        </button>
                      ))}

                  {state === 2 &&
                    menu.lunch
                    .filter((item) => item.type === categoria)
                    .map((item, indice) => (
                      <button
                        onClick={() => {
                          setOrder([...order, item]);
                        }}
                        className={style.foodPicsContainer}
                      >
                        <p key={indice}>
                          {item.name}
                          <br />
                          <br /> 

                            <img src={item.image} alt="foto.png" />

                            <div className={style.price}> {item.price}</div></p>
                         
                        </button>
                      ))}

                  {state === 3 &&
                    menu.breakfast.map((item, indice) => (
                      <div className={style.foodPicsContainer}>
                        <p key={indice}>
                          {item.name}
                          <br />
                          <br />

                          <img src={item.image} alt="foto.png" />

                          <div className={style.price}> {item.price}</div>
                        </p>
                      </div>
                    ))}

                  {state === 4 &&
                    menu.breakfast.map((item, indice) => (
                      <div className={style.foodPicsContainer}>
                        <p key={indice}>
                          {item.name}
                          <br />
                          <br />

                          <img src={item.image} alt="foto.png" />

                          <div className={style.price}> {item.price}</div>
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className={style.receipt}>
                <div className={style.receiptTitle}>
                  <h2> Receipt</h2>
                  <hr />
                  <div className={style.calculator}>
                    {/*como paso el state order aqui :( ? )*/}

                    {order.map((item) => {
                      return (
                        <div key={item.id}>
                      
                 {item.name + " "}{item.price}
                         
                        </div> 
                      );
                    })}
                  </div>
                  <h3> Total </h3>
                  <hr />
                  <div className={style.receiptBtns}>
                    <button onClick={handleClick} className={style.btnLogout}>
                      Take order
                    </button>


                    <button
                onClick={() => {
                  setCategoria(null);
                }}
             
                    className={style.btnLogout}>
                      Cancel
                    </button>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        <footer>
          <button onClick={logout} className={style.btnLogoutGoogle}>
            Logout
          </button>
        </footer>
      </div>

      {/*}  <AuthProvider
        onUserNotRegistered={firebaseName} 
                    ></AuthProvider>*/}
    </>
  );
}
