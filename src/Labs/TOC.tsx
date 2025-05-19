import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

export default function TOC() {
  const location = useLocation();

  return (
    <Nav variant="pills">
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab1"
          active={location.pathname === "/Labs/Lab1"}
        >
          Lab 1
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab2"
          active={location.pathname === "/Labs/Lab2"}
        >
          Lab 2
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          as={Link}
          to="/Labs/Lab3"
          active={location.pathname === "/Labs/Lab3"}
        >
          Lab 3
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link as={Link} to="/Kambaz">
          Kambaz
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link
          href="https://github.com/WSantry/kambaz-react-web-app.git"
          target="_blank"
        >
          My Github
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}
