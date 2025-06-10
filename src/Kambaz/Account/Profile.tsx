import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";

import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  const { currentUser } = useSelector((s: any) => s.accountReducer);

  /* redirect if nobody signed in; otherwise copy user → local state */
  useEffect(() => {
    if (!currentUser) {
      navigate("/Kambaz/Account/Signin");
      return;
    }
    setProfile(currentUser);
  }, [currentUser, navigate]);

  /* PUT → /api/users/:id */
  const updateProfile = async () => {
    const updated = await client.updateUser(profile);
    dispatch(setCurrentUser(updated));   // keep Redux/session in sync
  };

  /* POST → /signout, then wipe local store & redirect */
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };

  return (
    <div id="wd-profile-screen" style={{ maxWidth: 400 }}>
      <h3>Profile</h3>

      {profile && (
        <>
          {/* username / password */}
          <Form.Control
            id="wd-username"
            className="mb-2"
            placeholder="username"
            value={profile.username ?? ""}
            onChange={e => setProfile({ ...profile, username: e.target.value })}
          />
          <Form.Control
            id="wd-password"
            className="mb-2"
            type="password"
            placeholder="password"
            value={profile.password ?? ""}
            onChange={e => setProfile({ ...profile, password: e.target.value })}
          />

          {/* first / last names */}
          <Form.Control
            id="wd-firstname"
            className="mb-2"
            placeholder="first name"
            value={profile.firstName ?? ""}
            onChange={e => setProfile({ ...profile, firstName: e.target.value })}
          />
          <Form.Control
            id="wd-lastname"
            className="mb-2"
            placeholder="last name"
            value={profile.lastName ?? ""}
            onChange={e => setProfile({ ...profile, lastName: e.target.value })}
          />

          {/* date of birth */}
          <Form.Control
            id="wd-dob"
            className="mb-2"
            type="date"
            value={profile.dob ? profile.dob.slice(0, 10) : ""}
            onChange={e => setProfile({ ...profile, dob: e.target.value })}
          />

          {/* email */}
          <Form.Control
            id="wd-email"
            className="mb-2"
            placeholder="email"
            value={profile.email ?? ""}
            onChange={e => setProfile({ ...profile, email: e.target.value })}
          />

          {/* role selector */}
          <Form.Select
            id="wd-role"
            className="mb-2"
            value={profile.role ?? ""}
            onChange={e => setProfile({ ...profile, role: e.target.value })}
          >
            <option value="STUDENT">Student</option>
            <option value="TA">TA</option>
            <option value="FACULTY">Faculty</option>
            <option value="ADMIN">Admin</option>
          </Form.Select>

          {/* buttons */}
          <Button className="w-100 mb-2" onClick={updateProfile}>
            Update
          </Button>
          <Button variant="danger" className="w-100" onClick={signout}>
            Sign out
          </Button>
        </>
      )}
    </div>
  );
}
