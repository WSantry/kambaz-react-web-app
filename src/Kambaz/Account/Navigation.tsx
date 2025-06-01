import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Navigation.css"; 

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  // If nobody is signed in, show Signin and Signup; otherwise show Profile
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const location = useLocation();
  const linksMeta: Record<string, { to: string; id: string; label: string }> = {
    Signin: {
      to: "/Kambaz/Account/Signin",
      id: "wd-account-signin-link",
      label: "Signin",
    },
    Signup: {
      to: "/Kambaz/Account/Signup",
      id: "wd-account-signup-link",
      label: "Signup",
    },
    Profile: {
      to: "/Kambaz/Account/Profile",
      id: "wd-account-profile-link",
      label: "Profile",
    },
  };

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map((linkKey) => {
        const { to, id, label } = linksMeta[linkKey];
        const isActive = location.pathname === to;
        return (
          <Link
            key={id}
            to={to}
            id={id}
            className={`list-group-item border-0 ${isActive ? "active" : "text-danger"}`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
