import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button, FormControl } from "react-bootstrap";

import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const signin = async () => {
    try {
      const user = await client.signin(credentials);
      if (!user) return;               // guard: bad creds
      dispatch(setCurrentUser(user));  // save in Redux
      navigate("/Kambaz/Dashboard");  // go!
    } catch (e:any) {
      alert(e.response?.data?.message ?? "Signin failed");
    }
  };

  return (
    <div id="wd-signin-screen" style={{ maxWidth: 400 }}>
      <h1>Signin</h1>
      <FormControl
        id="wd-username"
        className="mb-2"
        placeholder="username"
        value={credentials.username ?? ""}
        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
      />
      <FormControl
        id="wd-password"
        className="mb-2"
        placeholder="password"
        type="password"
        value={credentials.password ?? ""}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <Button id="wd-signin-btn" className="w-100 mb-2" onClick={signin}>
        Sign in
      </Button>
      <Link id="wd-signup-link" to="/Kambaz/Account/Signup">
        Signup
      </Link>
    </div>
  );
}