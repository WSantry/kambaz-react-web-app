import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <h2>Editing: A2 - CSS & Layout</h2>

      <Form>
        {/* Assignment Name */}
        <Form.Group as={Row} className="mb-3" controlId="wd-name">
          <Form.Label column sm={2} className="text-end">
            Assignment Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" defaultValue="A2 - ENV + HTML" />
          </Col>
        </Form.Group>

        {/* Description */}
        <Form.Group as={Row} className="mb-3" controlId="wd-description">
          <Form.Label column sm={2} className="text-end">
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={4} defaultValue="The assignment is available..." />
          </Col>
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" defaultValue="100" />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="Assignments">
              <option value="Assignments">Assignments</option>
              <option value="Quizzes">Quizzes</option>
              <option value="Exams">Exams</option>
              <option value="Project">Project</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={2} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="points">
              <option value="points">Points</option>
              <option value="percentage">Percentage</option>
              <option value="letter">Letter Grade</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
<Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
  <Form.Label column sm={2} className="text-end">
    Submission Type
  </Form.Label>
  <Col sm={10}>
    <div className="border rounded p-3">
      <Form.Select defaultValue="online" className="mb-3">
        <option value="online">Online</option>
        <option value="onpaper">On Paper</option>
      </Form.Select>
      <div className="fw-bold mb-2">Online Entry Options</div>
      <div className="ms-2">
        <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
        <Form.Check id="wd-website-url" type="checkbox" label="Website URL" defaultChecked />
        <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
        <Form.Check id="wd-student-annotation" type="checkbox" label="Student Annotation" />
        <Form.Check id="wd-file-upload" type="checkbox" label="File Uploads" />
      </div>
    </div>
  </Col>
</Form.Group>

        {/* Assign Section */}
<Form.Group as={Row} className="mb-3" controlId="wd-assign-group">
  <Form.Label column sm={2} className="text-end">
    Assign
  </Form.Label>
  <Col sm={10}>
    <div className="border rounded p-3">
      {/* Assign To */}
      <Form.Group className="mb-3" controlId="wd-assign-to">
        <Form.Label className="fw-bold">Assign to</Form.Label>
        <Form.Select defaultValue="Everyone">
          <option value="Everyone">Everyone</option>
          <option value="Teachers">Teachers</option>
          <option value="Students">Students</option>
        </Form.Select>
      </Form.Group>

      {/* Due Date */}
      <Form.Group className="mb-3" controlId="wd-due-date">
        <Form.Label className="fw-bold">Due</Form.Label>
        <Form.Control type="date" defaultValue="2025-12-31" />
      </Form.Group>

      {/* Available From + Until on same row */}
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label className="fw-bold">Available from</Form.Label>
            <Form.Control type="date" defaultValue="2025-01-01" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-until">
            <Form.Label className="fw-bold">Until</Form.Label>
            <Form.Control type="date" defaultValue="2025-12-31" />
          </Form.Group>
        </Col>
      </Row>
    </div>
  </Col>
</Form.Group>


        <hr />
        <div className="text-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}
