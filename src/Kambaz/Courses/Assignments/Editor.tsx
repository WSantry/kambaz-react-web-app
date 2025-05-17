import { Form, Button, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-3">
      <h2>Editing: A2 - CSS & Layout</h2>

      <Form>
        {/* Assignment Name */}
        <Form.Group as={Row} className="mb-3" controlId="wd-name">
          <Form.Label column sm={2}>
            Assignment Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="text" defaultValue="A2 - ENV + HTML" />
          </Col>
        </Form.Group>

        {/* Description */}
        <Form.Group as={Row} className="mb-3" controlId="wd-description">
          <Form.Label column sm={2}>
            Description
          </Form.Label>
          <Col sm={10}>
            <Form.Control as="textarea" rows={4} defaultValue="The assignment is available..." />
          </Col>
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2}>
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" defaultValue="100" />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2}>
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
          <Form.Label column sm={2}>
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
          <Form.Label column sm={2}>
            Submission Type
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="online">
              <option value="online">Online</option>
              <option value="onpaper">On Paper</option>
            </Form.Select>
            <div className="mt-2 ms-3">
              <Form.Check id="wd-text-entry" type="checkbox" label="Text Entry" />
              <Form.Check id="wd-website-url" type="checkbox" label="Website URL" />
              <Form.Check id="wd-media-recordings" type="checkbox" label="Media Recordings" />
              <Form.Check id="wd-student-annotation" type="checkbox" label="Student Annotation" />
              <Form.Check id="wd-file-upload" type="checkbox" label="File Uploads" />
            </div>
          </Col>
        </Form.Group>

        {/* Assign To */}
        <Form.Group as={Row} className="mb-3" controlId="wd-assign-to">
          <Form.Label column sm={2}>
            Assign To
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="Everyone">
              <option value="Everyone">Everyone</option>
              <option value="Teachers">Teachers</option>
              <option value="Students">Students</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Dates */}
        <Form.Group as={Row} className="mb-3" controlId="wd-due-date">
          <Form.Label column sm={2}>
            Due Date
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" defaultValue="2025-12-31" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="wd-available-from">
          <Form.Label column sm={2}>
            Available From
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" defaultValue="2025-01-01" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="wd-available-until">
          <Form.Label column sm={2}>
            Available Until
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="date" defaultValue="2025-12-31" />
          </Col>
        </Form.Group>

        <hr />
        <div className="text-end">
          <Button variant="secondary" className="me-2">Cancel</Button>
          <Button variant="primary">Save</Button>
        </div>
      </Form>
    </div>
  );
}
