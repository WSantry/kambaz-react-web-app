import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";

import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signup() {
  const [user, setUser] = useState<any>({});
  const navigate  = useNavigate();
  const dispatch  = useDispatch();

  const signup = async () => {
    try {
      const currentUser = await client.signup(user);
      dispatch(setCurrentUser(currentUser));
      navigate("/Kambaz/Account/Profile");
    } catch (e:any) {
      alert(e.response?.data?.message ?? "Signup failed");
    }
  };

  return (
    <div id="wd-signup-screen" style={{ maxWidth: 400 }}>
      <h1>Signup</h1>
      <FormControl
        id="wd-username"
        className="mb-2"
        placeholder="username"
        value={user.username ?? ""}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        className="mb-2"
        type="password"
        placeholder="password"
        value={user.password ?? ""}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <Button id="wd-signup-btn" className="w-100 mb-2" onClick={signup}>
        Sign up
      </Button>
      <Link id="wd-signin-link" to="/Kambaz/Account/Signin">
        Signin
      </Link>
    </div>
  );
}