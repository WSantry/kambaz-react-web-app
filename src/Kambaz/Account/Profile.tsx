import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" style={{ maxWidth: "400px" }}>
      <h1>Profile</h1>

      <Form.Group className="mb-2" controlId="wd-username">
        <Form.Label>Username</Form.Label>
        <Form.Control defaultValue="alice" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="wd-password">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" defaultValue="123" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="wd-firstname">
        <Form.Label>First Name</Form.Label>
        <Form.Control defaultValue="Alice" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="wd-lastname">
        <Form.Label>Last Name</Form.Label>
        <Form.Control defaultValue="Wonderland" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="wd-dob">
        <Form.Label>DOB</Form.Label>
        <Form.Control type="date" defaultValue="2000-01-01" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="wd-email">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" defaultValue="alice@wonderland" />
      </Form.Group>

      <Form.Group className="mb-2" controlId="wd-role">
        <Form.Label>Role</Form.Label>
        <Form.Select defaultValue="FACULTY">
          <option value="USER">User</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
          <option value="ADMIN">Admin</option>
        </Form.Select>
      </Form.Group>

      <Link
  to="/Kambaz/Account/Signin"
  id="wd-signout-btn"
  className="btn btn-danger w-100 mb-2"
>
  Signout
</Link>
    </div>
  );
}
