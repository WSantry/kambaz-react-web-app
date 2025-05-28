import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css"; 

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const location = useLocation();

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      <Link
        to="/Kambaz/Account/Signin"
        id="wd-account-signin-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Account/Signin" ? "active" : "text-danger"}`}
      >
        Signin
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        id="wd-account-signup-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Account/Signup" ? "active" : "text-danger"}`}
      >
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Profile"
        id="wd-account-profile-link"
        className={`list-group-item border-0 ${location.pathname === "/Kambaz/Account/Profile" ? "active" : "text-danger"}`}
      >
        Profile
      </Link>
    </div>
  );
}
