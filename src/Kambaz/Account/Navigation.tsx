import { Link, useLocation } from "react-router-dom";
import { useSelector }       from "react-redux";
import "./Navigation.css";

export default function AccountNavigation() {
  const { currentUser } = useSelector((s:any)=>s.accountReducer);
  const location        = useLocation();

  const linksMeta = {
    Signin : { to:"/Kambaz/Account/Signin",  id:"wd-signin",  label:"Signin"  },
    Signup : { to:"/Kambaz/Account/Signup",  id:"wd-signup",  label:"Signup"  },
    Profile: { to:"/Kambaz/Account/Profile", id:"wd-profile", label:"Profile" },
    Users  : { to:"/Kambaz/Account/Users",   id:"wd-users",   label:"Users"   },
  };

  const base   = currentUser ? ["Profile"] : ["Signin","Signup"];
  const links  = currentUser?.role==="ADMIN" ? [...base,"Users"] : base;

  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      {links.map(k=>{
        const {to,id,label} = (linksMeta as any)[k];
        const active        = location.pathname.startsWith(to);
        return (
          <Link key={id} to={to} id={id}
                className={`list-group-item border-0 ${active?"active":"text-danger"}`}>
            {label}
          </Link>
        );
      })}
    </div>
  );
}
