import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: "400px" }}>
      <h3>Sign in</h3>
      <Form.Group className="mb-2" controlId="wd-username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="username" />
      </Form.Group>
      <Form.Group className="mb-2" controlId="wd-password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" />
      </Form.Group>

      <Link
        to="/Kambaz/Dashboard"
        id="wd-signin-btn"
        className="btn btn-primary w-100 mb-2"
      >
        Sign in
      </Link>
      <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}
