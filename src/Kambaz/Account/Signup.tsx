import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" style={{ maxWidth: "400px" }}>
      <h3>Sign up</h3>
      <Form.Group className="mb-2" controlId="wd-username">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="username" />
      </Form.Group>
      <Form.Group className="mb-2" controlId="wd-password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="password" />
      </Form.Group>
      <Form.Group className="mb-2" controlId="wd-password-verify">
        <Form.Label>Verify Password</Form.Label>
        <Form.Control type="password" placeholder="verify password" />
      </Form.Group>

      <Link
        to="/Kambaz/Account/Profile"
        className="btn btn-primary w-100 mb-2"
      >
        Sign up
      </Link>
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
  );
}
