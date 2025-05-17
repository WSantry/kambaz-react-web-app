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
        {/* 7 sample courses */}
        <Col>
          <Card style={{ width: "250px" }}>
            <Link to="/Kambaz/Courses/1234/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/reactjs.jpg" height={160} />
              <Card.Body>
                <Card.Title>CS1234 React JS</Card.Title>
                <Card.Text>Full Stack Development</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "250px" }}>
            <Link to="/Kambaz/Courses/2345/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="/images/nodejs.png" height={160} />
              <Card.Body>
                <Card.Title>CS2345 Node JS</Card.Title>
                <Card.Text>Server-side Development</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
        {/* repeat for all 7 courses */}
      </Row>
    </div>
  );
}
