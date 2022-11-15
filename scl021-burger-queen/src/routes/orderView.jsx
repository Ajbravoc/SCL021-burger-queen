import AuthProvider from "../components/authProvider";
import {Link, useNavigate} from "react-router-dom";
import {useState } from "react";
import DashboardWrapper from "../components/dashboardWrapper";
import {breakfast} from "../menu/menu.json";


export default function DashboardView() {
    const navigate = useNavigate ();
    const [currentUser, setCurrentUser] = useState({});
    const [state, setState] = useState(0);

  function handleUserLoggedIn(user) {
    setCurrentUser (user);
    setState(2);
  }

  
  function handleUserNotRegistered(user) {
   navigate ("/");
  }

  function handleUserNotLoggedIn() {
    navigate("/");
  }
 
if (state === 0){

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >Loading......</AuthProvider>
  );
}



return( 
    <DashboardWrapper>
        <div>
            <h1>Dashboard: Pantalla con comida</h1>
        </div>
    </DashboardWrapper>
);
}
