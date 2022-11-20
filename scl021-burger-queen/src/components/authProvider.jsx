import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth, getUserInfo } from "../firebase/firebase";

export default function AuthProvider({ children, onUserNotRegistered }) {
  

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
          const userInfo = await getUserInfo(user.uid);
          if (userInfo.processCompleted) {
            onUserNotRegistered(userInfo);
          } else {
            onUserNotRegistered(userInfo);
          }
        }
      }
    );
  }, [ onUserNotRegistered]);
  return <div>{children}</div>;
}


/*{
  Contención: un componente no tiene que conocer a los componentes hijos 
  se puede representar como un elemento genérico
  como lo representamos? 
  destructuré, children hace referencia a los elementos hijos 
  cualquier cosa que le pase a authprovid. será children
  onUserNotR-> callback 
  useEffect(Hook) , ejecuta una porcion de codigo dependiendo de como se configure 
  ciclo de vida REACT (estado y ciclo de vida)
  
}*/