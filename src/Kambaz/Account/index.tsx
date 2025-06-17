// src/Kambaz/Account/index.tsx
import {
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";

import Signin           from "./Signin";
import Signup           from "./Signup";
import Profile          from "./Profile";
import Users            from "./Users";
import AccountNavigation from "./Navigation";

//  drawer component reused by Courses & Account
import PeopleDetails from "../Courses/People/Details";

export default function Account() {
  const { currentUser } = useSelector((s: any) => s.accountReducer);

  return (
    <Container fluid className="p-3">
      <h2>Account</h2>

      <Row>
        {/* sidebar */}
        <Col xs={12} md={3} lg={2}>
          <AccountNavigation />
        </Col>

        {/* main pane */}
        <Col xs={12} md={9} lg={10}>
          <Routes>
            {/* landing ― redirect to Sign-in or Profile */}
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    currentUser
                      ? "/Kambaz/Account/Profile"
                      : "/Kambaz/Account/Signin"
                  }
                />
              }
            />

            <Route path="Signin"  element={<Signin />} />
            <Route path="Signup"  element={<Signup />} />
            <Route path="Profile" element={<Profile />} />

            {/* ── USERS: list + (optional) drawer ── */}
           <Route path="Users">
    {/* list only */}
    <Route index   element={<UsersLayout />} />
    {/* list + drawer */}
    <Route path=":uid" element={<UsersLayout />} />
  </Route>
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

/* 1 ─────────── small helper that knows whether a uid is present */
function UsersLayout() {
  const { uid } = useParams();               // ← catches :uid from the URL
  return (
    <>
      <Users />                              {/* always: the table */}
      {uid && <PeopleDetails key={uid} />}   {/* only when /Users/:uid */}
    </>
  );
}

