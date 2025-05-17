import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";
import { Container, Row, Col } from "react-bootstrap";

export default function Account() {
  return (
    <Container fluid className="p-3">
      <h2>Account</h2>
      <Row>
        <Col xs={12} md={3} lg={2}>
          <AccountNavigation />
        </Col>
        <Col xs={12} md={9} lg={10}>
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
