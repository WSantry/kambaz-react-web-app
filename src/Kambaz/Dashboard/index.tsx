import { Link } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2>
      <hr />

      <Row xs={1} md={2} lg={3} className="g-4">

        {/* 1) CS1234 React JS */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/1234/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/reactjs.jpg"
                width="100%"
                height={160}
                alt="ReactJS"
              />
              <Card.Body>
                <Card.Title>CS1234 React JS</Card.Title>
                <Card.Text>Full Stack Development</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* 2) CS2345 Node JS */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/2345/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/nodejs.png"
                width="100%"
                height={160}
                alt="NodeJS"
              />
              <Card.Body>
                <Card.Title>CS2345 Node JS</Card.Title>
                <Card.Text>Server-side Development</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* 3) CS3456 MongoDB */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/3456/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/mongodb.png"
                width="100%"
                height={160}
                alt="MongoDB"
              />
              <Card.Body>
                <Card.Title>CS3456 MongoDB</Card.Title>
                <Card.Text>Database Systems</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* 4) CS4567 Express */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/4567/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/express.png"
                width="100%"
                height={160}
                alt="Express"
              />
              <Card.Body>
                <Card.Title>CS4567 Express</Card.Title>
                <Card.Text>RESTful APIs</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* 5) CS5678 TypeScript */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/5678/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/typescript.png"
                width="100%"
                height={160}
                alt="TypeScript"
              />
              <Card.Body>
                <Card.Title>CS5678 TypeScript</Card.Title>
                <Card.Text>Typed JavaScript</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* 6) CS6789 HTML & CSS */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/6789/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/html.png"
                width="100%"
                height={160}
                alt="HTML & CSS"
              />
              <Card.Body>
                <Card.Title>CS6789 HTML &amp; CSS</Card.Title>
                <Card.Text>Front-end Web Dev</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        {/* 7) CS7890 Python */}
        <Col style={{ width: "300px" }}>
          <Card>
            <Link
              to="/Kambaz/Courses/7890/Home"
              className="text-decoration-none text-dark"
            >
              <Card.Img
                variant="top"
                src="/images/python.png"
                width="100%"
                height={160}
                alt="Python"
              />
              <Card.Body>
                <Card.Title>CS7890 Python</Card.Title>
                <Card.Text>Backend Scripting</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

      </Row>
    </div>
  );
}
