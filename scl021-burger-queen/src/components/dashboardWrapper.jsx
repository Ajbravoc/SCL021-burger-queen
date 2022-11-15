import { Link } from "react-router-dom";

export default function DashboardWrapper({ children }) {

    const logout =() => {
        console.log("user is logged out")
    }

  return (
    <div>
      <button className="clear" onClick={logout}>
       
        Logout
      </button>
      <div>{children}</div>
    </div>
  );
}
