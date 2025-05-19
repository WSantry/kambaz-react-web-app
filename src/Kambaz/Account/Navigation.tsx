import { Link } from "react-router-dom";
import "./Navigation.css"; // optional, if you want consistent active styling

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation" className="list-group fs-5 rounded-0">
      <Link
        to="/Kambaz/Account/Signin"
        id="wd-account-signin-link"
        className="list-group-item active border-0"
      >
        Signin
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        id="wd-account-signup-link"
        className="list-group-item text-danger border-0"
      >
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Profile"
        id="wd-account-profile-link"
        className="list-group-item text-danger border-0"
      >
        Profile
      </Link>
    </div>
  );
}