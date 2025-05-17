import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function AccountNavigation() {
  return (
    <ListGroup>
      <ListGroup.Item as={Link} to="/Kambaz/Account/Signin">
        Signin
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Account/Signup">
        Signup
      </ListGroup.Item>
      <ListGroup.Item as={Link} to="/Kambaz/Account/Profile">
        Profile
      </ListGroup.Item>
    </ListGroup>
  );
}
