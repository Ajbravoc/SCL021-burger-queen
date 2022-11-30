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

  const [categoria, setCategoria] = useState("drink");
  const [order, setOrder] = useState([]);
const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);
  const decrease = () => {
    setCount(count - 1);
  };
  const increase = () => {
    setCount(count + 1);
  };



  

  function firebaseName(user) {
    //navigate ('/choose-username');
    setCurrentUser(user); //Setea el nombre de usuario loggeado
  }
  console.log(menu);

  const handleClick = () => {
    console.log("button clicked");
  };

  {
    /*ayuda akii
  const addProduct = (item,quantity) => {
    if( setOrder(item.id)){
      setCategoria(menu.map(product => {
        return product.id === item.id ? {...product,quantity:product.quantity + quantity } : product
      }));
    } else {
      ([...setOrder, {...item, quantity}]);
    }
  }
*/
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

  return (
    <>
      <div className={style.borderExt}>
        <div className={style.mainContainer}>
          <nav>
            <h1> Welcome, {currentUser.displayName} </h1>
          </nav>
          <div className={style.tablesContainer}>
            <div className={style.col}>Table 01</div>
            <div className={style.col}>Table 02</div>
            <div className={style.col}>Table 03</div>
            <div className={style.col}>Table 04</div>
            <div className={style.col}>Table 05</div>
            <div className={style.col}>Table 06</div>
            <div className={style.date}>Date</div>
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

                            <div className={style.price}> {item.price}</div>
                          </p>
                        </button>
                      ))}

                  {state === 2 &&
                    menu.lunch
                      .filter((item) => item.type === categoria)
                      .map((item, index) => (
                        <button
                          onClick={() => {
                            setOrder([...order, item]);
                          }}
                          className={style.foodPicsContainer}
                        >
                          <div className={style.context}>
                            <p key={index}>
                              {item.name}
                              <br />
                              <br />{" "}
                            </p>

                            <img src={item.image} alt="foto.png" />

                            <div className={style.price}> {item.price}</div>
                          </div>
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
                          {item.name + " " + item.price}

                          <div className={style.counter}>
                            
                            
                            <button disabled={count <= 1} onClick={decrease}>
                              -
                            </button>
                            <span>{count}</span>
                            <button disabled={count >= 35} onClick={increase}>
                              +
                            </button>
                            <div></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/*1. Que sume el total 
                  2. Que no se acumulen y se vayan adicionando*/}
                  <p className={style.total}>
                   Total: {/*{quantity * item.price}} */}
                  </p>
                  <hr />
                  <div className={style.receiptBtns}>
                    <button onClick={handleClick} className={style.btnLogout}>
                      Take order
                    </button>

                    <button
                      onClick={() => {
                        setOrder([]);
                      }}
                      className={style.btnLogout}
                    >
                      Cancel
                    </button>
                  </div>{" "}
                </div>
              </div>
            </div>
          </div>{" "}
          <button onClick={logout} className={style.btnLogoutGoogle}>
            Logout
          </button>
        </div>{" "}
        <footer></footer>
      </div>

      {/*}  <AuthProvider
        onUserNotRegistered={firebaseName} 
                    ></AuthProvider>*/}
    </>
  );
}
