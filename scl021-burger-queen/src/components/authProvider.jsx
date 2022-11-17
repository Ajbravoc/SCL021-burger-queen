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
