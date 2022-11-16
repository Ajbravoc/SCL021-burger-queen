import {
  onAuthStateChanged,
} from "firebase/auth";
import { useEffect} from "react";
import { auth, getUserInfo, userExists } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


export default function AuthProvider({
  children,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
       
        const isLogged = await userExists(user.uid);
        if (isLogged) {
            const userInfo = await getUserInfo(user.uid);
            if(userInfo.processCompleted){
              onUserNotRegistered(userInfo);
            }else{
               onUserNotRegistered(userInfo);
            }
        } 
      } 
    });
  }, [navigate,  onUserNotRegistered]);
  return <div>{children}</div>;
}
